'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidEmail, routeLead } = require('../scripts/routing');

test('validates common email addresses', () => {
  assert.equal(isValidEmail('guest@example.com'), true);
  assert.equal(isValidEmail('not-an-email'), false);
});

test('routes an airport transfer as urgent', () => {
  const lead = routeLead(
    {
      name: 'Ana Rivera',
      email: 'ANA@EXAMPLE.COM',
      phone: '+504 9999-0000',
      service: 'Airport Transfer',
      message: 'Pickup requested.',
    },
    new Date('2026-08-24T12:00:00.000Z'),
  );

  assert.equal(lead.priority, 'Urgent');
  assert.equal(lead.assignedOwner, 'Operations');
  assert.equal(lead.email, 'ana@example.com');
  assert.equal(lead.responseDueAt, '2026-08-24T12:10:00.000Z');
});

test('uses the general inquiry route for an unknown service', () => {
  const lead = routeLead({
    name: 'Test Guest',
    email: 'guest@example.com',
    service: 'Custom Request',
  });

  assert.equal(lead.priority, 'Normal');
  assert.equal(lead.assignedOwner, 'Customer Care');
  assert.equal(lead.responseTargetMinutes, 30);
});

test('rejects missing names and invalid emails', () => {
  assert.throws(() => routeLead({ email: 'guest@example.com' }), /Name is required/);
  assert.throws(
    () => routeLead({ name: 'Test Guest', email: 'invalid' }),
    /valid email/,
  );
});
