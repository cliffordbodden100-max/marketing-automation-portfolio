# Case Study: Lead Capture & Automated Follow-Up

## Context

This demonstration models a guest-services company in Roatán that receives inquiries for airport transfers, tours, vacation rentals, and general assistance. The company needs faster response, shared visibility, and reliable follow-up without adopting a large enterprise CRM.

## Goal

Create a maintainable workflow that captures every inquiry, validates essential data, assigns an owner and SLA, logs the lead, and starts an appropriate communication sequence.

## Design decisions

### Webhook-first intake

A webhook makes the system compatible with website forms, landing pages, and other channels. The workflow returns a clear JSON response to the calling application.

### Deterministic routing

Service-to-owner and service-to-SLA mappings are explicit. This makes the decision process testable and easy for a business owner to approve.

### Lightweight CRM

Google Sheets is used as the lead-facing CRM because it is familiar, accessible, and appropriate for a small team. It is not confused with PostgreSQL, which supports n8n internally.

### Human-led commercial decisions

Automation acknowledges receipt, records data, assigns work, and sends scheduled follow-up. A person remains responsible for pricing, availability, exceptions, and commitments.

## Implementation

1. A lead submits name, email, phone, service, and message.
2. n8n validates and normalizes the payload.
3. Routing logic assigns priority, owner, and response target.
4. The lead is appended to the CRM.
5. Brevo creates or updates the contact and enrolls it in the active-lead list.
6. An immediate acknowledgement is sent.
7. The contact proceeds through 24-hour and 72-hour follow-up steps.

## Demonstrated result

The end-to-end test confirmed webhook intake, validation, routing, CRM logging, contact creation, immediate email, follow-up enrollment, and sanitized credential handling.

Because this is a portfolio demonstration using fictional data, the project reports functional test results—not revenue or client-performance claims.

## Potential production improvements

- Add retry and dead-letter handling for external API failures.
- Add alerting for urgent leads that miss their SLA.
- Add idempotency keys to prevent duplicate submissions.
- Use a hosted n8n deployment with encrypted backups and uptime monitoring.
- Add consent, retention, and deletion rules appropriate to the operating market.
