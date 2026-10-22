// Run with `npm test` (Node 22.18+ strips the TypeScript types).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizePhone, buildQuoteMessage } from '../src/lib/quote.ts';

test('normalizePhone accepts common Indian formats', () => {
  assert.equal(normalizePhone('98765 43210'), '9876543210');
  assert.equal(normalizePhone('+91-98765-43210'), '9876543210');
  assert.equal(normalizePhone('09876543210'), '9876543210');
  assert.equal(normalizePhone('919876543210'), '9876543210');
});

test('normalizePhone rejects landlines / short / junk', () => {
  assert.equal(normalizePhone('12345'), null);
  assert.equal(normalizePhone('5876543210'), null);
  assert.equal(normalizePhone('abc'), null);
});

test('buildQuoteMessage skips empty fields and keeps order', () => {
  const labels = { name: 'Name', phone: 'Phone', city: 'City', quantity: 'Qty', brand: 'Brand', grade: 'Grade' };
  const msg = buildQuoteMessage('Hi', labels, { name: ' Ravi ', phone: '9876543210', city: '', quantity: '5', brand: 'Jindal TMT', grade: 'Fe 500D' });
  assert.equal(msg, 'Hi\n\nName: Ravi\nPhone: 9876543210\nQty: 5\nBrand: Jindal TMT\nGrade: Fe 500D');
});
