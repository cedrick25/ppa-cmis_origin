# PPA CMIS — Knowledge Transfer Document

**System:** Expansion Case Management Information System (CMIS)  
**Organization:** Parole and Probation Administration (PPA), Department of Justice, Philippines  
**Document date:** June 8, 2026  
**Repositories:**

| Component | Path | URL (local) |
|-----------|------|-------------|
| Frontend (Portal) | `C:\wamp64\www\ppa-cmis_origin` | `http://localhost/ppa-cmis_origin/` |
| Backend (API) | `C:\wamp64\www\ppa-cmis-api_origin` | `http://localhost/ppa-cmis-api_origin/wsv1/` |

**Production references (in code):**
- `http://cmis.probation.gov.ph`
- `http://eppcmis.probation.gov.ph`
- `http://pis.probation.gov.ph`

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture](#2-architecture)
3. [Tech Stack](#3-tech-stack)
4. [Local Setup (WAMP)](#4-local-setup-wamp)
5. [Frontend (ppa-cmis_origin)](#5-frontend-ppa-cmis_origin)
6. [Backend API (ppa-cmis-api_origin)](#6-backend-api-ppa-cmis-api_origin)
7. [Forms System](#7-forms-system)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Key Features & Workflows](#9-key-features--workflows)
10. [API Endpoint Reference](#10-api-endpoint-reference)
11. [Database Structure](#11-database-structure)
12. [Recent Changes](#12-recent-changes)
13. [Known Issues & Security Notes](#13-known-issues--security-notes)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. System Overview

CMIS is a web-based case management portal for PPA field offices. It supports:

- **Monthly caseload encoding** for statutory forms (F5, F21, F44, F45, F50, F51, F53)
- **Probation masterlist** and **community service masterlist** management
- **Records check** — cross-form search by docket number or name
- **Regional, field, and quarterly reports** (on-screen + PDF export)
- **User administration**, audit trail, backup/restore, offline migration
- Integration with **PIS** (Probationer Information System) and **UAMS** (SMS/email OTP)

The frontend is a **thin CodeIgniter shell** (views + JavaScript). All business logic and database access live in the separate API repository.

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser (jQuery / Bootstrap / DataTables)                    │
│  ppa-cmis_origin — Portal.php loads views, wms-*.js calls API  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ JSON POST/GET
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  ppa-cmis-api_origin — wsv1/* controllers + models              │
└──────┬──────────────────┬──────────────────┬────────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
  ppa_cmis DB       ppa_pis DB         expansion DB
  (F5, F21, users)  (docket book)      (F44–F53, CSM)
```

**Data flow example (F5T8 encoding):**
1. User selects field office + form + date in modal → navigates to `/caseload?form=F5T8&...`
2. `wms-form5.js` posts JSON to `/wsv1/Cmis/F5T8`
3. On save, also calls `/wsv1/Cmis/upsertMasterlist` (direct to masterlist — no approval queue)
4. API writes to `ppa_cmis.F5T8` and `ppa_cmis.masterlist`

---

## 3. Tech Stack

| Layer | Frontend | API |
|-------|----------|-----|
| Framework | CodeIgniter 3.1.4 | CodeIgniter 3 |
| Language | PHP | PHP >= 5.6 |
| JS | jQuery 3.2, Bootstrap 3, DataTables, Select2, Chart.js, jsPDF | — |
| PDF | Dompdf (`Report.php`) | — |
| Excel import | — | PhpSpreadsheet ^2.1 |
| Database | None (API only) | mysqli (3 connection groups) |
| Auth state | jquery.cookie (client-side) | MD5 passwords, session flag in DB |

---

## 4. Local Setup (WAMP)

### Prerequisites
- WAMP with Apache + PHP + MySQL
- Both repos cloned under `C:\wamp64\www\`
- Three MySQL databases configured in API: `ppa_cmis`, `ppa_pis`, `expansion`

### Setup checklist

1. **Clone/copy both repositories:**
   - `C:\wamp64\www\ppa-cmis_origin`
   - `C:\wamp64\www\ppa-cmis-api_origin`

2. **Configure API database** in `ppa-cmis-api_origin/application/config/database.php` (3 groups: `default`, `pis`, `expansion`)

3. **Run Composer** in API repo (for PhpSpreadsheet):
   ```
   cd C:\wamp64\www\ppa-cmis-api_origin
   composer install
   ```

4. **Verify IP whitelist** in `ppa-cmis_origin/application/config/config.php` — your subnet must be in the `$allowed` array (use `127.0.0` for localhost)

5. **Verify `MIN_URL`** in `ppa-cmis_origin/application/config/constants.php` matches your folder name:
   ```php
   define('MIN_URL', "/ppa-cmis_origin/min?f=/ppa-cmis_origin/");
   ```

6. **Update hardcoded URLs** if not using localhost:
   - `application/controllers/Report.php` — API URLs for PDF generation
   - `assets/js/wms-login.js` — UAMS SMS/email endpoints for OTP

7. **Access the app:** `http://localhost/ppa-cmis_origin/login`

---

## 5. Frontend (ppa-cmis_origin)

### Directory structure

```
ppa-cmis_origin/
├── application/
│   ├── config/          config.php, constants.php, routes.php, autoload.php
│   ├── controllers/
│   │   ├── Portal.php   All page routes (view loaders only)
│   │   ├── Report.php   PDF records-check downloads (Dompdf + cURL)
│   │   └── Version.php  404 fallback
│   └── views/
│       ├── templates/   header, footer, nav, modal_form
│       ├── forms-control/  Interactive form UI (78 partials)
│       ├── forms/       Printable table markup
│       ├── report/      ~102 regional/field/quarterly report templates
│       └── widgets/     Dashboard widgets, form filters
├── assets/js/           wms-*.js, cmis.*.js (application logic)
└── min/                 JS/CSS minifier
```

### Controllers

**`Portal.php`** — Thin view loaders. No server-side business logic. Key routes:

| Route | Method | View | Purpose |
|-------|--------|------|---------|
| `/login` | `index()` | `login.php` | Login page |
| `/dashboard` | `dashboard()` | `dashboard.php` | Post-login home |
| `/caseload` | `caseload()` | `caseload.php` | Form encoding workspace |
| `/probationer` | `probationer()` | `probationer.php` | Probation masterlist |
| `/community_service_masterlist` | `community_service_masterlist()` | `community_service_masterlist.php` | Community service masterlist |
| `/records_check` | `records_check()` | `records_check.php` | Cross-form records search |
| `/report` | `report()` | `report.php` | Report viewer |
| `/user_list` | `user_list()` | `user_list.php` | User administration |
| `/audit` | `audit()` | `audit.php` | Audit trail |
| `/upload_masterlist` | `upload_masterlist()` | `upload_masterlist.php` | Excel masterlist upload |
| `/migrate_offline` | `migrate_offline()` | `migrate_offline.php` | Offline data migration |

**`Report.php`** — Server-side PDF via Dompdf + cURL to API:

| Route | Purpose |
|-------|---------|
| `/download_report` | Probation records-check PDF (public) |
| `/download_report_admin` | Probation PDF with offices-not-submitted appendix |
| `/download_report_CS` | Community service records-check PDF (public) |
| `/download_report_CS_admin` | Community service PDF with appendix |

### Key JavaScript files

| File | Namespace | Purpose |
|------|-----------|---------|
| `wms-main.js` | `$.wms` | Core AJAX helpers (`executeExternalPost`, `executeExternalGet`, etc.) |
| `wms-login.js` | `$.wms.login` | Login, OTP, cookie setup, permissions |
| `wms-dashboard.js` | `$.wms.dashboard` | Session guard, logout, permission gating |
| `wms-widget.js` | `$.wms.widget` | Field office dropdowns, form page event dispatcher |
| `wms-form5.js` | `$.wms.form5` | Form 5 tables (F5T1–F5T13); F5T8 → direct masterlist |
| `wms-form21.js` | `$.wms.form21` | Form 21 tables (F21T1–F21T15) |
| `wms-form44.js` – `wms-form53.js` | `$.wms.form44`–`form53` | Expansion forms |
| `wms-probationer.js` | `$.wms.probationer` | Masterlist DataTables, PDF download |
| `wms-records_check.js` | `$.wms.records` | Cross-table search |
| `wms-report.js` | `$.wms.report` | Report rendering (~10K lines) |
| `cmis.reports.js` | `$.wms.reports` | Caseload summary reports |
| `cmis.modal.js` | `$.wms.modal` | Caseload modal navigation |

### API call pattern

```javascript
// All API calls resolve to: window.location.origin + path
$.wms.executeExternalPost('/ppa-cmis-api_origin/wsv1/Cmis/F5T8', JSON.stringify(payload));

// Response format:
// { status: 'SUCCESS' | 'FAILED' | 'ERROR', payload: ... }
```

### Configuration notes

- **`config.php`:** IP whitelist blocks unauthorized subnets (`die()` on mismatch)
- **`routes.php`:** Friendly URL aliases (see Portal routes above)
- **`autoload.php`:** Only `session` library and `url` helper — no models
- **No server-side auth middleware** in Portal — protection is client-side cookies + API validation

---

## 6. Backend API (ppa-cmis-api_origin)

### Directory structure

```
ppa-cmis-api_origin/
├── application/
│   ├── config/          database.php (3 DB groups), routes.php, autoload.php
│   ├── controllers/
│   │   ├── wsv1/        ★ Main API controllers
│   │   ├── Maintenance.php
│   │   └── Version.php
│   ├── models/          ★ 41 models (auto-loaded)
│   └── third_party/ssp.php  DataTables server-side processing
├── composer.json        PhpSpreadsheet
└── vendor/
```

### API controllers (`application/controllers/wsv1/`)

| Controller | Purpose |
|------------|---------|
| **`Api.php`** | Auth, user admin, backup/restore, offline migration, form config |
| **`Cmis.php`** | Form 5 & Form 21 CRUD, masterlist, widgets, reports, audit |
| **`Pis.php`** | PIS integration — field offices, docket book, referrals |
| **`Expansion.php`** | Community service masterlist search (F53) — `communitySSP`, `community_json` |
| **`Community_Service.php`** | F53T10 REST CRUD on `community_service_masterlist` |
| **`Records_check.php`** | Cross-database record search by docket/name |
| **`Import.php`** | Excel bulk import (probation masterlist + community service masterlist) |
| **`No_reports.php`** | Offices that did not submit reports |

### URL convention

```
{base_url}/wsv1/{Controller}/{method}
```

- Controllers: PascalCase (`Cmis`, `Community_Service`, `Records_check`)
- Methods: camelCase (`fetchF5T1ByYM`, `excel_upload`)
- Most endpoints: `POST` with JSON body
- Import: `POST` multipart/form-data
- Records check / SSP: `GET` query params

### Response format

```json
{
  "status": "SUCCESS",
  "message": "...",
  "payload": { ... }
}
```

### Models overview

| Model group | Tables | Notes |
|-------------|--------|-------|
| `Cmis_F5T1_model` – `Cmis_F5T13_model` | `F5T1`–`F5T13_*` | Form 5 tables in `ppa_cmis` |
| `Cmis_F21T1_model` – `Cmis_F21T15_model` | `F21T1`–`F21T15_*` | Form 21 (pardon/parole split tables) |
| `Cmis_F5PCS_model`, `Cmis_F21PCS_model` | All F5/F21 tables | Summary/PCS reporting |
| `Cmis_Probationer_model` | `masterlist` | SSP search with utf8mb4 Ñ handling |
| `Expansion_model` | `community_service_masterlist` | Community service search |
| `Community_model` | `community_service_masterlist` | F53T10 REST CRUD |
| `Records_check_model` | Cross-DB | Search all F5/F21 + expansion tables |
| `Import_model` | `masterlist`, `community_service_masterlist` | Excel import |
| `API_model` | `USERS`, `audit_trail`, etc. | Auth, migration, backup |
| `Pis_model` | `field_office`, `docket_book` | PIS DB integration |

**Common model pattern:** Payload contains `method` (`insert`, `update`, `fetch`, `delete`, `upsert`), `field_office`, `Y_M`, `docket_no`, and case-specific fields.

---

## 7. Forms System

Each form has three layers:

1. **`forms-control/F{form}T{n}.php`** — Interactive UI (buttons, modals, add/edit/delete)
2. **`forms/F{form}T{n}.php`** — Printable table HTML
3. **`wms-form{n}.js`** — CRUD logic calling API endpoints

### Form catalog

| Form | Name | Tables |
|------|------|--------|
| **F5** | Probation Caseload | F5PCS, F5T1–F5T13 |
| **F21** | Parole/Executive Clemency | F21PCS, F21T1–F21T15 |
| **F44** | Suspended Sentence | F44T1–F44T13, F44SSCS |
| **F45** | Community Service (Minor Drug Offender) | F45T1–F45T13, F45CSCS |
| **F50** | Voluntary Confinement | F50T1–F50T2, F50VCCS |
| **F51** | Release on Recognizance | F51T1–F51T4, F51RORCS |
| **F53** | Community Service (Aresto) | F53T1–F53T11, F53CSAIPCS |

### Caseload URL pattern

```
/caseload?form=F5T8&date=2026-05&field=MANILA&officeId=123&page=0&size=700
```

### Notable tables

- **F5T8** — Probation Supervision Referrals Received; saves directly to masterlist via `upsertMasterlist` (no approval queue since Apr 2026)
- **F53T10** — Community service period; uses `/wsv1/Community_Service/` REST endpoints

---

## 8. Authentication & Authorization

### Login flow (`wms-login.js`)

```
1. User enters USERNAME + PASSWORD
2. POST /wsv1/api/authenticate
3. If USER_LEVEL_ID != 0 (regular user):
     → Set cookies: USER_ID, USER_NAME, PERMISSIONS, etc.
     → Redirect to /dashboard
4. If USER_LEVEL_ID == 0 (OTP required):
     → Generate 5-digit OTP
     → SMS via UAMS (192.168.1.200)
     → Email via UAMS (192.168.1.219)
     → User enters OTP → same cookie flow → /dashboard
```

### Session guard (`wms-dashboard.js`)
- No `USER_ID` cookie → redirect to `/login`
- Periodic `POST /wsv1/Api/isActive` check
- Logout: audit insert + clear all cookies

### Permission model
- `PERMISSIONS` cookie (JSON array of module IDs)
- Module IDs map to CSS classes: `access_f5`, `access_ml`, `access_rc`, `access_csm`, etc.
- `ACCESS_RIGHTS == "0"` hides UI elements

### API security
- **Auth endpoints** check referer whitelist (production/staging hosts only)
- Passwords stored as **MD5** (legacy)
- Most data endpoints have **no token auth** — rely on network-level access control
- CORS: `Access-Control-Allow-Origin: *`

---

## 9. Key Features & Workflows

### A. Caseload Encoding
1. Dashboard → Caseload → select field office, form, date in modal
2. `caseload.php` loads `forms-control/{form}.php` + `forms/{form}.php`
3. `wms-widget.js` dispatches to correct form module (e.g. `F5T8` → `wms-form5.js`)
4. Save posts to `/wsv1/Cmis/{FormTable}` with `method: insert|update`

### B. Probation Masterlist
1. Navigate to `/probationer`
2. DataTables SSP via `/wsv1/Cmis/masterlistSSP`
3. Edit inline or download PDF via `/download_report` or `/download_report_admin`

### C. Community Service Masterlist
1. Navigate to `/community_service_masterlist`
2. DataTables SSP via `/wsv1/Expansion/communitySSP`
3. PDF download via `/download_report_CS` or `/download_report_CS_admin`

### D. Records Check
1. Navigate to `/records_check`
2. Search by docket number or name
3. `GET /wsv1/Records_check/search_data` (CMIS tables)
4. `GET /wsv1/Records_check/search_expansion_data` (expansion tables)

### E. Excel Import
1. Navigate to `/upload_masterlist`
2. Upload Excel file
3. `POST /wsv1/Import/excel_upload` (probation) or `excel_upload_csm` (community service)

### F. Reports
1. Navigate to `/report?form={report_type}`
2. `wms-report.js` loads appropriate report view from `views/report/`
3. Print or export as needed

### G. Offline Migration
1. Navigate to `/migrate_offline`
2. Triggers API migration endpoints (`/wsv1/Api/migrate_offline`, `migrate_f5`, `migrate_f21`, etc.)

---

## 10. API Endpoint Reference

### Authentication
```
POST /wsv1/api/authenticate
POST /wsv1/api/getUserTypeByModulesByID
POST /wsv1/Api/isActive
POST /wsv1/Api/doLogout
```

### Caseload (Form 5 / Form 21)
```
POST /wsv1/Cmis/{F5T1|F5T8|F21T1|...}     method: insert|update|fetch|delete
POST /wsv1/Cmis/validateDocket
POST /wsv1/Cmis/AuditInsert
POST /wsv1/Cmis/F5SUMMARY | F21SUMMARY
```

### Masterlist
```
GET  /wsv1/Cmis/masterlistSSP              DataTables SSP
POST /wsv1/Cmis/masterlist_json            PDF/search export
POST /wsv1/Cmis/upsertMasterlist
GET  /wsv1/Expansion/communitySSP          Community service SSP
POST /wsv1/Expansion/community_json        Community service JSON search
```

### Records Check
```
GET /wsv1/Records_check/search_data         CMIS tables
GET /wsv1/Records_check/search_expansion_data  Expansion tables
```

### Community Service (F53T10)
```
GET    /wsv1/Community_Service/index/{id}
POST   /wsv1/Community_Service/store
PUT    /wsv1/Community_Service/update/{id}
DELETE /wsv1/Community_Service/delete/{id}
```

### Import
```
POST /wsv1/Import/excel_upload             Probation masterlist
POST /wsv1/Import/excel_upload_csm         Community service masterlist
```

### PIS Integration
```
POST /wsv1/Pis/getAllFieldOffices
POST /wsv1/Pis/getDocketDataByDocketNo
POST /wsv1/Pis/getFactSheet
```

### Reports / Admin
```
GET  /wsv1/no_reports/get_reports/{F5|F53}
POST /wsv1/Api/backup | backupDate | full_restore
POST /wsv1/Api/migrate_offline | migrate_f5 | migrate_f21
```

### PDF (Frontend CodeIgniter routes)
```
/download_report              Probation records-check PDF
/download_report_admin        Probation PDF + offices-not-submitted
/download_report_CS           Community service PDF
/download_report_CS_admin     Community service PDF + appendix
```

---

## 11. Database Structure

### Connection groups (`database.php`)

| Group | Database | Purpose |
|-------|----------|---------|
| `default` | `ppa_cmis` | F5, F21, users, masterlist, audit, no_reports |
| `pis` | `ppa_pis` | Docket book, field offices, regions |
| `expansion` | `expansion` | F44–F53, community_service_masterlist |

### Key tables

**ppa_cmis (default):**
- `F5T1`–`F5T13_*` — Form 5 caseload tables
- `F21T1`–`F21T15_*` — Form 21 caseload tables
- `masterlist` — Probationer masterlist
- `USERS`, `USER_LEVEL`, `USER_LEVEL_RIGHTS` — Auth
- `audit_trail` — Audit logging
- `no_reports` — Offices with missing reports

**expansion:**
- `community_service_masterlist` — Community service masterlist (replaces legacy `f53t10` + `client_profile` join)
- F44–F53 form tables

**ppa_pis:**
- `field_office`, `docket_book`, `system_codes`

### Data relationships
- Records use `status = 1` for active rows
- Case transfers cascade deletes (e.g. F5T2 delete removes prior F5T1 record)
- PIS automation: `upsertSF5T*` methods read PIS data and write to CMIS tables

---

## 12. Recent Changes

| Date | Area | Change | Repos |
|------|------|--------|-------|
| May 2026 | Masterlist enhancement | 4 PDF variants, expanded masterlist views | Frontend |
| Apr 2026 | F5T8 direct masterlist | Encoding goes straight to masterlist; approval queue removed from nav | Frontend |
| Apr 2026 | F53T10 integration | REST CRUD API + frontend page events | Both |
| Apr 2026 | Reports Ñ (enye) encoding | `mb_convert_case` UTF-8 + utf8mb4_bin collation for proper ñ handling | Both |
| Apr 2026 | F53 download result | `community_json` export improvements | API |
| Feb 2026 | Community service masterlist | Removed field office from search filter; Excel import (`excel_upload_csm`) | Both |
| Nov 2025 | Records check | New cross-form search feature | Both |
| Oct 2025 | Import module | Excel bulk import with PhpSpreadsheet | API |

---

## 13. Known Issues & Security Notes

| Issue | Detail | Recommendation |
|-------|--------|----------------|
| MD5 passwords | Legacy hashing in `API_model` | Plan migration to bcrypt/argon2 |
| No API token auth | Most endpoints open with CORS `*` | Add middleware or network-level restriction |
| Client-side auth only | Portal has no server-side session check | Add CI hook/middleware for protected routes |
| SQL concatenation | Some older query paths | Audit and parameterize |
| Hardcoded URLs | API, UAMS, PIS URLs in JS/PHP | Move to config/env variables |
| `BASE_URL()` undefined | Used in header/nav but not defined in repo | Use CI `base_url()` helper |
| IP whitelist | `config.php` blocks non-whitelisted subnets | Update `$allowed` array for new networks |

---

## 14. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Blank page on load | IP not in whitelist | Add subnet to `$allowed` in `config.php` |
| Login fails | API not running or DB misconfigured | Check WAMP, verify `database.php` credentials |
| API returns 404 | mod_rewrite not enabled | Enable Apache `mod_rewrite`, check `.htaccess` |
| Forms not saving | Wrong API URL in JS | Verify `wms-main.js` path resolves to correct host |
| Ñ search returns wrong results | Charset mismatch | Ensure utf8mb4 on DB connection and search queries |
| PDF download empty | cURL to API failing | Check `Report.php` API URLs and API availability |
| OTP not received | UAMS endpoints unreachable | Verify `192.168.1.200` / `192.168.1.219` network access |
| DataTables not loading | SSP endpoint error | Check browser console, verify `/wsv1/Cmis/masterlistSSP` response |

---

## Contacts & References

- **Frontend repo:** `ppa-cmis_origin` (Bitbucket: `hanselmejarito/ppa-cmis_origin`)
- **API repo:** `ppa-cmis-api_origin` (Bitbucket: `hanselmejarito/ppa-cmis-api_origin`)
- **Related systems:** PIS (`pis.probation.gov.ph`), UAMS (SMS/email OTP)

---

*This document reflects the codebase as of June 2026. Update when deploying to new environments or after significant feature changes.*
