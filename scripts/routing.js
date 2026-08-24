'use strict';

const ROUTES = Object.freeze({
  'airport transfer': {
    priority: 'Urgent',
    owner: 'Operations',
    responseTargetMinutes: 10,
  },
  'tour booking': {
    priority: 'High',
    owner: 'Sales — Tours',
    responseTargetMinutes: 15,
  },
  'vacation rental': {
    priority: 'High',
    owner: 'Reservations',
    responseTargetMinutes: 15,
  },
  'general inquiry': {
    priority: 'Normal',
    owner: 'Customer Care',
    responseTargetMinutes: 30,
  },
});

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function routeLead(input, now = new Date()) {
  const name = normalizeText(input?.name);
  const email = normalizeText(input?.email).toLowerCase();
  const phone = normalizeText(input?.phone);
  const serviceKey = normalizeText(input?.service).toLowerCase();
  const message = normalizeText(input?.message);

  if (!name) throw new Error('Name is required');
  if (!isValidEmail(email)) throw new Error('A valid email is required');

  const route = ROUTES[serviceKey] || ROUTES['general inquiry'];
  const receivedAt = new Date(now);
  const responseDueAt = new Date(
    receivedAt.getTime() + route.responseTargetMinutes * 60_000,
  );

  return {
    leadId: `LEAD-${receivedAt.getTime()}`,
    receivedAt: receivedAt.toISOString(),
    name,
    email,
    phone,
    service: serviceKey
      ? serviceKey.replace(/\b\w/g, (character) => character.toUpperCase())
      : 'General Inquiry',
    message,
    priority: route.priority,
    assignedOwner: route.owner,
    responseTargetMinutes: route.responseTargetMinutes,
    responseDueAt: responseDueAt.toISOString(),
    status: 'New',
  };
}

module.exports = { isValidEmail, routeLead };
