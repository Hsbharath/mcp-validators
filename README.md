# MCP Schema Validator

A developer tool for validating API response contracts across multiple MCP (Model Context Protocol) servers. Built to eliminate manual JSON inspection when debugging schema mismatches between MCP servers and downstream consumers.

> **NOTE:** This is a Proof of Concept (POC). All MCP server data, API responses, and schema definitions are mocked. See [`src/data/mcpServers.js`](src/data/mcpServers.js) for the full list of servers, endpoint definitions, expected schemas, and fake response payloads.

## The Problem

When building platforms that consume multiple MCP servers, every endpoint must return data in a precise structure. Even minor deviations — a missing field, a renamed key, a wrong type, unexpected nesting — can silently break downstream integrations.

The traditional workflow looked like this:

1. Call the endpoint with Postman or curl
2. Read the raw JSON response
3. Compare it manually against the documented schema
4. Try to spot the mismatch

With 40+ MCP servers and large response payloads, this process was slow and error-prone. A subtle bug could take an hour to find.

## The Solution

This tool automates schema contract validation end-to-end:

- Calls the MCP endpoint directly (simulated with realistic mock responses)
- Loads the expected schema contract for that endpoint
- Compares the actual response against the schema
- Highlights every difference — missing fields, extra fields, type mismatches, null values where objects are expected

Instead of reading JSON by eye, engineers get immediate, structured feedback on exactly what is wrong and where.

## Features

- **42 MCP servers** across 16 categories (Automotive, Healthcare, HR, Finance, Logistics, and more)
- **Schema diff engine** — recursive deep comparison with path-level reporting
- **Diff types detected:** missing fields, extra fields, type mismatches, null mismatches
- **Side-by-side view** — syntax-highlighted actual response vs expected schema contract
- **Mock API layer** — simulates real network behavior: random latency (120–900ms), 12% error rate, 22% deliberate schema mismatch rate for testing
- **Force valid** — bypass randomness to test the happy path
- **Bulk health check** — validate all endpoints across all servers simultaneously with a live progress bar
- **Overview dashboard** — per-server health status grid with latency averages

## Project Structure

```
src/
├── data/
│   └── mcpServers.js        # 42 MCP server definitions with schemas and fake responses
├── lib/
│   ├── mockApi.js           # Simulated network layer with latency and error injection
│   └── schemaValidator.js   # Recursive schema diff engine
├── components/
│   ├── Sidebar.jsx          # Searchable server list grouped by category
│   ├── ValidatorPanel.jsx   # Endpoint caller and validation results view
│   ├── DiffPanel.jsx        # Side-by-side JSON diff with issue list
│   └── Dashboard.jsx        # Overview and bulk health check
└── app/
    └── page.js              # Root page
```

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Validate a Single Endpoint

1. Select any MCP server from the left sidebar (search or browse by category)
2. Choose an endpoint from the list
3. Click **Call Endpoint** — the tool calls the mock server, runs schema validation, and shows results
4. Use **Force Valid Response** to test the clean path without random errors or mismatches

### Run a Bulk Health Check

1. Go to the **Dashboard** (home view)
2. Click **Run Health Check**
3. The tool tests every endpoint across all 42 servers in parallel and shows a health grid

### Understanding Results

| Badge | Meaning |
|-------|---------|
| `MISSING` | A field required by the schema is absent from the response |
| `EXTRA` | The response contains a field not defined in the schema |
| `TYPE` | A field exists but has the wrong data type |
| `NULL` | A field is null where an object or value is expected |

## MCP Server Categories

| Category | Servers |
|----------|---------|
| Automotive | Car Inventory, Fleet Management, Car Service, Car Rental, EV Charging, Parking Management |
| Healthcare | Patient Records, Pharmacy, Telemedicine, Dental Clinic, Clinical Trials, Patient Billing |
| Human Resources | Payroll, Attendance, Recruitment, Employee Benefits |
| Finance | Banking, Tax Compliance, Asset Management, Mortgage, Fraud Detection |
| Logistics | Shipment Tracking, Warehouse Inventory, Supply Chain |
| Hospitality | Hotel Booking, Restaurant POS |
| Security | Cybersecurity Alerts, Building Access |
| Other | E-Commerce Orders, Real Estate, Insurance Claims, Education LMS, CRM, Smart Grid, Legal Cases, Manufacturing, Social Media Analytics, IoT Sensors, Project Management, Food Delivery, Agriculture, Sports Analytics, Library Catalog, Government Permits, Airline Booking, Event Management |
