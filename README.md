# GhatSheild AI 💧

### Water-Quality Intelligence & Decision Support for Bhopal

GhatSheild AI is a prototype dashboard for exploring water-quality observations from Bhopal's ghats. It brings monitoring insights, historical trends, data-quality review, sampling prioritisation, and evidence-oriented reporting into one interface.

> **Status:** Prototype / under active development. This software is not an official regulatory system, does not replace laboratory testing, and must not be used as the sole basis for public-health or compliance decisions.

## Why this project?

Water-quality teams may need to review observations from multiple locations, identify incomplete or questionable records, compare trends, and plan follow-up sampling. A unified interface can make those records easier to inspect and discuss.

## Capabilities

The interface is organised around the following workflows; availability and depth depend on the current implementation and configured data:

- **Overview dashboard** — review high-level indicators and priority signals.
- **Ghat intelligence** — inspect location-specific information.
- **Water-quality trends** — compare observations over time.
- **Data-quality review** — surface records that may need validation.
- **Sampling prioritisation** — support review of locations for follow-up sampling.
- **AI copilot** — explore water-quality information with AI-assisted interaction.
- **Reports and evidence** — prepare traceable summaries and exports.
- **Diagnostics and helpdesk** — prototype support utilities.

## Technology

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- Google Gemini integration through `@google/genai`
- Express and dotenv (available dependencies; usage depends on the configured workflow)

## Repository layout

```text
src/
├── components/
│   ├── common/
│   ├── modals/
│   └── screens/
└── App.tsx
.env.example
index.html
package.json
tsconfig.json
vite.config.ts
```

## Run locally

### Prerequisites

- Node.js and npm compatible with the versions required by the dependencies
- A Gemini API key only if you intend to use Gemini-backed functionality

### Setup

```bash
git clone https://github.com/Ayush-Tech-45/GhatSheild-AI.git
cd GhatSheild-AI
npm install
```

Create a local `.env` file based on `.env.example` and configure values required by your workflow. Keep real credentials out of commits.

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux**
```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Vite is configured to use port 3000. The terminal will show the local URL.

Build and type-check:

```bash
npm run build
npm run lint
```

Run these checks in your local environment before relying on the build status; they have not been executed as part of this documentation update.

## Configuration and security

- Store API keys in local environment variables or your deployment provider's secret manager.
- Never commit real `.env` files, tokens, credentials, or personal data.
- Keep `.env.example` limited to placeholder values.
- Check dataset provenance, licensing, data quality, and permitted use before importing records.
- Validate AI summaries and prioritisation recommendations with trusted sources and human review.
- Do not claim regulatory compliance unless the applicable criteria, data, calculations, and validation process have been independently established.

## Contributing

1. Create a branch for a focused change.
2. Make the change and test it locally.
3. Use a descriptive commit message.
4. Open a pull request with context, screenshots for UI changes, and test results.

Suggested branch prefixes: `feat/`, `fix/`, `docs/`, and `test/`.

## Current status and limitations

This repository contains a dashboard prototype. Data integrations, analytical rules, AI workflows, authentication, and deployment behaviour should be reviewed against the source before operational use. Feature descriptions above are not a guarantee that every workflow is production-ready.

## License

The source contains an Apache-2.0 SPDX header. Add or verify the repository's top-level license file before relying on the project-wide licensing terms.
