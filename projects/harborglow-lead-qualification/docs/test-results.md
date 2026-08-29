# Validation results

Validation date: **August 29, 2026**

> All contacts, inputs, scores, and results below are fictional and **SIMULATED**. They do not represent client performance or live business outcomes.

## End-to-end cases

| Test case | Input focus | Expected result | Observed result | Status |
|---|---|---|---|---|
| Noah | In-area ZIP, move-in/move-out service, every-two-weeks cadence, 2,200 sq ft, date over 30 days away | Score 75; Qualified; Send Estimate | Score 75; Qualified; Send Estimate | Passed |
| Mia | In-area ZIP, deep cleaning, weekly cadence, 1,800 sq ft, date over 30 days away | Score 80; Qualified; Send Estimate | Score 80; Qualified; Send Estimate | Passed |
| Leo | ZIP outside configured Tampa service area | Unqualified; Outside Service Area; Mark Unqualified | Unqualified; Outside Service Area; Mark Unqualified | Passed |

## Regression and safety cases

| Test case | Expected result | Observed result | Status |
|---|---|---|---|
| Past preferred-service date | Negative days; urgency 0; score 75; Send Estimate | −9 days; urgency 0; score 75; Send Estimate | Passed |
| Duplicate-processing prevention | Processed contact no longer matches `Pending Qualification` | Search returned zero output items | Passed |
| HubSpot write-back | Score, summary, status, reason, and next action persist to CRM | All mapped properties appeared in HubSpot | Passed |
| Simulation disclosure | Summary clearly identifies the rule-based simulation | Summary begins `SIMULATED rule-based qualification` | Passed |
| Credential safety | Public export contains no credential secret or local credential reference | Security scan passed; references removed | Passed |
| Pinned-data safety | Public export contains no mock or execution records | `pinData` is empty | Passed |

## Past-date regression calculation

| Dimension | Points |
|---|---:|
| ZIP fit | 25 |
| Service value | 15 |
| Frequency value | 20 |
| Home fit | 15 |
| Urgency | 0 |
| **Total** | **75** |

The regression test was added after detecting that a negative day count could fall into the `<= 14` branch. Version 1.1 checks for past dates first and assigns zero urgency points.

## Evidence retained

- Successful n8n execution showing one item across all four nodes
- HubSpot property verification for score, status, next action, reason, and summary
- Zero-output duplicate-prevention execution
- Past-date mock output confirming `days_until_service: -9` and `urgency: 0`

Screenshots are intentionally excluded from the workflow export so contact data and execution payloads are not bundled into the reusable template.

