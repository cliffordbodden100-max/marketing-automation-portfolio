# Setup Guide

## 1. Configure the local environment

Copy `.env.example` to `.env` and replace every placeholder with a strong local value.

```bash
cp .env.example .env
```

Do not commit `.env`.

## 2. Start n8n and PostgreSQL

```bash
docker compose up -d
```

Open `http://localhost:5678` and complete the n8n owner setup.

## 3. Prepare Google Sheets

1. Create a spreadsheet with the same headers as `sample-data/crm-template.csv`.
2. In n8n, create a Google Sheets credential using OAuth2 or a dedicated service account.
3. Replace `YOUR_SPREADSHEET_ID` and the sheet name in the imported workflow.
4. Grant the configured Google identity access to the spreadsheet.

## 4. Prepare Brevo

1. Create a Brevo API credential inside n8n.
2. Create an `Active Leads` list and record its numeric list ID.
3. Replace `YOUR_BREVO_LIST_ID` in the workflow.
4. Configure an authenticated sender in Brevo.
5. Build the 24-hour and 72-hour automation sequence in Brevo, triggered by list enrollment.

## 5. Import the workflow

Import `workflows/lead-capture-follow-up.sanitized.json`. Open every node marked with a placeholder and attach your own credentials or resource IDs.

## 6. Test safely

Use `sample-data/test-lead.json` as the body of a POST request to the test webhook. Confirm:

- The webhook responds successfully.
- The route fields are correct.
- One row appears in Google Sheets.
- One contact appears in Brevo.
- The acknowledgement email arrives.
- A retry does not create unexpected duplicates.

## 7. Production checklist

- Activate HTTPS and a real domain.
- Set a strong `N8N_ENCRYPTION_KEY`.
- Restrict server ports and access.
- Configure encrypted database backups.
- Add monitoring and failure alerts.
- Document ownership and escalation rules.
- Confirm consent and data-retention requirements.

The included Compose file is for a local portfolio demonstration. Review n8n's current production deployment guidance before handling real customer data.
