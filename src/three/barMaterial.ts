import * as THREE from 'three';
import { barConfig as C } from './barConfig';

/** Shared by every bar material; the scroll timeline writes these directly (no React re-render). */
export const barUniforms = {
  uMix: { value: 0 },     // 0 = polished new steel, 1 = mill-scale + rust
  uBend: { value: 0 },    // 0 = straight, 1 = full arc
  uSection: { value: 0 }, // caps: 0 = machined cut end, 1 = etched cross-section
  uHeat: { value: 0 },    // caps: glow of the still-hot core
  uLength: { value: C.length },
};

const NOISE = /* glsl */ `
uniform float uMix; uniform float uBend; uniform float uSection; uniform float uHeat; uniform float uLength;
varying vec2 vBarUv; varying vec3 vLocal;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash12(i), hash12(i+vec2(1,0)), f.x), mix(hash12(i+vec2(0,1)), hash12(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float s = 0., a = .5; for(int i=0;i<4;i++){ s += a*vnoise(p); p *= 2.03; a *= .5; } return s; }
`;

// Bend the bar into an arc in the XY plane. Normal first (before defaultnormal_vertex), then position.
const BEND_NORMAL = /* glsl */ `
  vBarUv = uv; vLocal = position;
  float bendA = uBend * 2.2;
  float bendR = uLength / max(abs(bendA), 1e-4) * sign(bendA + 1e-6);
  float ba = position.x / bendR;
  if (abs(bendA) > 1e-4) objectNormal = vec3(objectNormal.x*cos(ba) - objectNormal.y*sin(ba), objectNormal.x*sin(ba) + objectNormal.y*cos(ba), objectNormal.z);
`;
const BEND_POSITION = /* glsl */ `
  if (abs(bendA) > 1e-4) {
    float rr = bendR - transformed.y;
    transformed = vec3(sin(ba) * rr, bendR - cos(ba) * rr - (bendR - bendR * cos(bendA * .5)) * .5, transformed.z);
  }
`;

function inject(mat: THREE.MeshStandardMaterial, frag: Record<string, string>) {
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, barUniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\n' + NOISE)
      .replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\n' + BEND_NORMAL)
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n' + BEND_POSITION);
    shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\n' + NOISE);
    for (const [chunk, code] of Object.entries(frag))
      shader.fragmentShader = shader.fragmentShader.replace(`#include <${chunk}>`, `#include <${chunk}>\n${code}`);
  };
}

export function createBarMaterials(normalMap: THREE.Texture) {
  const body = new THREE.MeshStandardMaterial({ normalMap, normalScale: new THREE.Vector2(1, 1), envMapIntensity: 1.25 });
  inject(body, {
    color_fragment: /* glsl */ `
      float n = fbm(vBarUv * vec2(48., 120.));
      float streak = vnoise(vBarUv * vec2(260., 5.));
      float cav = texture2D(normalMap, vNormalMapUv).a;
      float rustAmt = smoothstep(.2, .75, cav + (n - .5) * .55) * uMix;
      vec3 polished = vec3(.80, .81, .83) * (.94 + .06 * streak);
      vec3 scale = mix(vec3(.055, .06, .065), vec3(.16, .15, .14), n);
      vec3 rust = mix(vec3(.30, .09, .02), vec3(.70, .28, .07), fbm(vBarUv * vec2(90., 230.)));
      diffuseColor.rgb = mix(polished, mix(scale, rust, rustAmt), uMix);`,
    roughnessmap_fragment: /* glsl */ `
      roughnessFactor = mix(.2 + .12 * streak, .55 + .25 * n + .2 * rustAmt, uMix);`,
    metalnessmap_fragment: /* glsl */ `
      metalnessFactor = mix(.92, mix(.7, .1, rustAmt), uMix);`,
  });

  const cap = new THREE.MeshStandardMaterial({ envMapIntensity: 1.3 });
  inject(cap, {
    color_fragment: /* glsl */ `
      float r = length(vLocal.yz) / ${C.radius.toFixed(3)};
      float ang = atan(vLocal.z, vLocal.y);
      // radial machining marks, faded where they'd alias (fwidth) and at the centre where they converge
      float ph = ang * 180. + fbm(vLocal.yz * 30.) * 3.;
      float lines = .5 + .5 * sin(ph) * (1. - smoothstep(.4, 1.2, fwidth(ph))) * smoothstep(.05, .35, r);
      float ring = smoothstep(.72, .79, r);                                     // tempered martensite rim
      vec3 machined = vec3(.86, .86, .88) * (.9 + .1 * lines);
      vec3 section = mix(vec3(.58, .56, .53), vec3(.13, .14, .16), ring) * (.9 + .1 * fbm(vLocal.yz * 40.));
      diffuseColor.rgb = mix(machined, section, uSection);`,
    roughnessmap_fragment: /* glsl */ `
      roughnessFactor = mix(.28 + .2 * lines, mix(.6, .35, ring), uSection);`,
    metalnessmap_fragment: /* glsl */ `
      metalnessFactor = mix(.85, .55, uSection);`,
    emissivemap_fragment: /* glsl */ `
      vec3 hot = mix(vec3(1., .78, .3), vec3(1., .3, .02), smoothstep(0., .72, r));
      totalEmissiveRadiance += uHeat * (1. - ring) * hot * 1.8 + uHeat * ring * vec3(.25, .05, 0.) * (1. - smoothstep(.79, 1., r));`,
  });

  return { body, cap };
}
