# GhatShield AI 💧
### Water Quality Intelligence & Decision Support for Bhopal

GhatShield AI is an AI-powered water-quality intelligence and decision-support prototype designed for municipal teams working with water-quality observations from Bhopal's ghats. It brings monitoring insights, historical trends, data-quality checks, sampling prioritisation, and evidence-oriented reporting into one dashboard.

> **Project status:** Prototype / under active development. Outputs should support human review and must not be treated as official regulatory determinations or a substitute for laboratory testing.

## 🎯 Problem

Water-quality teams need to review observations from multiple locations, understand changes over time, identify incomplete or questionable records, and decide where follow-up sampling may be most useful. Scattered records can make this analysis slower and harder to explain.

## 💡 Proposed Solution

GhatShield AI provides a unified console to explore ghat-level intelligence and turn water-quality records into understandable, traceable decision support for municipal users.

## ✨ Key Capabilities

- **Overview dashboard** — a central view of water-quality intelligence and priority signals.
- **Ghat intelligence** — inspect an individual ghat and explore its information.
- **Water-quality trends** — review historical patterns and compare observations over time.
- **Data-quality review** — surface records that may need validation or further investigation.
- **Sampling optimiser** — help prioritise locations for follow-up sampling.
- **AI copilot** — an interface for AI-assisted exploration of water-quality information.
- **Reports & evidence** — prepare evidence-oriented exports and audit dossiers.
- **System diagnostics and helpdesk** — supporting utilities for the prototype.

Actual outputs depend on the available data, configuration, and implementation. Validate all criteria and results with the relevant authoritative source before operational use.

## 🧰 Technology Stack

- **Frontend:** React 19, TypeScript
- **Build tool / development server:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Motion:** Motion
- **AI integration:** Google Gemini API via `@google/genai`
- **Supporting packages:** Express, dotenv

## 📁 Project Structure

```text
GhatShield-AI/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── modals/
│   │   └── screens/
│   └── App.tsx
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (use a current LTS release compatible with the project dependencies)
- npm
- A Google Gemini API key if you use AI-powered functionality

### 1. Clone the repository

```bash
git clone https://github.com/Ayush-Tech-45/GhatShield-AI.git
cd GhatShield-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

**macOS / Linux**
```bash
cp .env.example .env
```

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

Set the required values in your local environment. The example file documents `GEMINI_API_KEY` and `APP_URL`. Never commit real API keys or other secrets to GitHub. If using Google AI Studio, follow the project's configured secrets workflow.

### 4. Start the development server

```bash
npm run dev
```

Vite is configured to serve on port **3000**. Open the local URL printed in the terminal (typically http://localhost:3000).

### 5. Build for production

```bash
npm run build
```

To preview a production build locally:

```bash
npm run preview
```

TypeScript validation is available through:

```bash
npm run lint
```

## 🔐 Security & Data Notes

- Keep API keys and secrets in local environment configuration or the deployment platform's secret manager.
- Do not commit `.env` files containing real secrets, credentials, or private data.
- Check data licensing, provenance, quality, and permitted use before adding datasets.
- Treat AI-generated summaries and priority assessments as decision support that requires human verification.
- Confirm the applicable CPCB criteria and official guidance for the intended water use before claiming compliance.

## 👥 Team

Built collaboratively by the GhatShield AI project team.

| Name | Role |
|---|---|
| Ayush Rathore | Project Lead |
| Team member | Add name and contribution |
| Team member | Add name and contribution |

Update this table with the confirmed names and responsibilities of all contributors.

## 🤝 Contributing

We welcome contributions from the project team.

1. Clone the repository and create a branch for your task.
2. Make focused changes and test them locally.
3. Commit with a descriptive message.
4. Push your branch and open a Pull Request to `main`.
5. Ask a teammate to review the changes before merging.

Suggested branch names: `feat/ghat-dashboard`, `fix/data-validation`, or `docs/readme-update`.

## 📌 Current Status

This repository contains the GhatShield AI dashboard prototype. Data integrations, AI workflows, validation logic, and deployment details may evolve as development continues.

## 📄 License

No license has been specified yet. Unless a license is added, reuse and redistribution permissions are not automatically granted.
