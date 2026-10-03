# Validation results

Original validation date: **August 29, 2026**  
Enhancement QA prepared: **October 3, 2026**

> All contacts, inputs, scores, and results below are fictional and **SIMULATED**. They do not represent client performance or live business outcomes.

## Previously validated end-to-end cases

| Test case | Input focus | Expected result | Observed result | Status |
|---|---|---|---|---|
| Noah | In-area ZIP, move-in/move-out service, every-two-weeks cadence, 2,200 sq ft, date over 30 days away | Score 75; Qualified; Send Estimate | Score 75; Qualified; Send Estimate | Passed |
| Mia | In-area ZIP, deep cleaning, weekly cadence, 1,800 sq ft, date over 30 days away | Score 80; Qualified; Send Estimate | Score 80; Qualified; Send Estimate | Passed |
| Leo | ZIP outside configured Tampa service area | Unqualified; Outside Service Area; Mark Unqualified | Unqualified; Outside Service Area; Mark Unqualified | Passed |

## Previously validated regression and safety cases

| Test case | Expected result | Observed result | Status |
|---|---|---|---|
| Past preferred-service date | Negative days; urgency 0; score 75; Send Estimate | −9 days; urgency 0; score 75; Send Estimate | Passed |
| Duplicate-processing prevention | Processed contact no longer matches `Pending Qualification` | Search returned zero output items | Passed |
| HubSpot write-back | Score, summary, status, reason, and next action persist to CRM | All mapped properties appeared in HubSpot | Passed |
| Simulation disclosure | Summary clearly identifies the rule-based simulation | Summary begins `SIMULATED rule-based qualification` | Passed |
| Credential safety | Public export contains no credential secret or local credential reference | Security scan passed; references removed | Passed |
| Pinned-data safety | Public export contains no mock or execution records | `pinData` is empty | Passed |

## October 2026 enhancement under test

The current workflow adds two improvements:

1. **Explainable qualification output**
   - `qualification_reasons` records how each scoring category contributed points.
   - `decision_reason` records the rule that determined the final route.
   - `qualification_summary` combines the score, reasons, decision, and recommended action.

2. **HubSpot retry configuration**
   - `Retry On Fail`: enabled
   - Maximum tries: **3**
   - Wait between tries: **3,000 ms**
   - Applied to both `Find Pending HubSpot Leads` and `Write Qualification to HubSpot`.

These changes are implemented in the sanitized workflow export. The test cases below are prepared in HubSpot but **have not yet been executed against the updated local n8n workflow**, so their status remains pending.

## Prepared QA matrix

| Test case | Prepared input | Expected score / rule | Expected route | What to verify | Status |
|---|---|---|---|---|---|
| Outside service area | ZIP 34101; Deep Cleaning; Every Two Weeks; 1,800 sq ft; Oct. 8, 2026 | 65/100 numerically; outside-area rule overrides score | Unqualified; Outside Service Area; Mark Unqualified | `qualification_reasons` shows +0 ZIP fit and category points; `decision_reason` explains the ZIP override | Pending |
| High-value qualified lead | ZIP 33602; Deep Cleaning; Every Two Weeks; 1,800 sq ft; Oct. 10, 2026 | 90/100 | Qualified; Call Immediately | Reasons total 90; decision reason cites the 85-point threshold | Pending |
| Nurture lead | ZIP 33603; Standard Cleaning; One Time; 900 sq ft; Nov. 15, 2026 | 53/100 | Nurture; Begin Nurture Sequence | Reasons total 53; decision reason cites the 50–69 range | Pending |
| Missing preferred service date | ZIP 33604; Deep Cleaning; Every Two Weeks; 1,800 sq ft; preferred date blank | Numerical score still calculated from available fields; missing-field rule overrides score | Needs More Information; Request More Information | Decision reason identifies `preferred service date` as missing | Pending |

## Retry QA still required

The retry settings are configured, but a controlled failure test is needed before claiming they are validated. The test should confirm:

- a temporary HubSpot failure causes another attempt;
- the node makes no more than three attempts;
- attempts are separated by approximately 3 seconds;
- a successful retry continues the workflow;
- a failure after the final attempt stops the workflow under the current `On Error: Stop Workflow` setting.

Until that test is completed, the portfolio should describe retry logic as **configured**, not as proven production reliability.

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

Validated evidence already retained:

- Successful n8n execution showing one item across all four nodes
- HubSpot property verification for score, status, next action, reason, and summary
- Zero-output duplicate-prevention execution
- Past-date mock output confirming `days_until_service: -9` and `urgency: 0`

Evidence still to capture for the October enhancement:

- Output showing `qualification_reasons` for each prepared routing path
- Output showing `decision_reason` for score-based and override decisions
- HubSpot write-back containing the improved readable summary
- Execution evidence for the retry test

Screenshots are intentionally excluded from the reusable workflow export so contact data and execution payloads are not bundled into the template.
