# Scoring and routing model

> All rules and examples are **SIMULATED** for a fictional Tampa home-cleaning company. The model is deterministic and explainable; it is not a trained machine-learning model.

## Score composition

### 1. Service-area ZIP fit — 25 points maximum

The contact receives 25 points when the submitted ZIP is in the configured Tampa service area:

`33602`, `33603`, `33604`, `33605`, `33606`, `33607`, `33609`, `33611`, `33614`, `33616`, `33619`, `33629`

An outside-area ZIP receives zero ZIP points and triggers the `Unqualified` route regardless of the numerical score.

### 2. Service value — 20 points maximum

| Service description contains | Points |
|---|---:|
| Recurring | 20 |
| Deep or Move | 15 |
| Standard | 10 |
| Another non-empty service | 5 |
| Missing | 0 |

### 3. Frequency / retention value — 20 points maximum

| Cleaning frequency | Points |
|---|---:|
| Weekly | 20 |
| Every Two Weeks / Biweekly | 15 |
| Monthly | 10 |
| One Time / One-Time | 5 |
| Another non-empty frequency | 5 |
| Missing | 0 |

### 4. Home / job fit — 15 points maximum

| Home size | Points |
|---|---:|
| 1,000–3,500 sq ft | 15 |
| Above 3,500 sq ft | 10 |
| 1–999 sq ft | 8 |
| Missing or zero | 0 |

### 5. Service-date urgency — 20 points maximum

| Days until requested service | Points |
|---|---:|
| Past date | 0 |
| 0–7 days | 20 |
| 8–14 days | 15 |
| 15–30 days | 10 |
| More than 30 days | 5 |

The v1.1 regression fix explicitly checks for negative day values before evaluating the future-date thresholds.

## Decision order

The order matters because business eligibility can override the numerical score:

1. Missing required information → `Needs More Information` / `Request More Information`
2. Outside service area → `Unqualified` / `Outside Service Area` / `Mark Unqualified`
3. Score at least 85 → `Qualified` / `Call Immediately`
4. Score at least 70 → `Qualified` / `Send Estimate`
5. Score at least 50 → `Nurture` / `Begin Nurture Sequence`
6. Score below 50 → `Needs More Information` / `Human Review`

## Required information

The rule engine checks for:

- ZIP code
- service type
- cleaning frequency
- preferred service date
- at least one contact method

The HarborGlow form used for validation requires an email address, which supports the HubSpot create-or-update operation used in the workflow.

## Governance notes

- Review ZIP coverage, service weights, and thresholds with the business owner before production use.
- Recalibrate weights using consented historical conversion and revenue data.
- Monitor outcomes for systematic bias or unintended exclusion.
- Keep the rule explanation visible to sales and operations teams.
- Do not describe the deterministic score as machine-learning output.

