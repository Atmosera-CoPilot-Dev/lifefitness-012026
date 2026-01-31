You are a senior software architect experienced with ASP.NET Core and Angular. Produce a clear, actionable project plan for an e-commerce web app.

Context
- Scope: catalog, search, cart, checkout, payments, orders, admin portal.
- Goal: scalable, maintainable, secure; RESTful APIs between client and server.

Assumptions/Constraints
- Tech: ASP.NET Core 8 (C# 12), Angular 17, OpenAPI 3.1, EF Core, SQL Server or PostgreSQL (justify), Redis.
- Auth: OAuth 2.1 / OIDC with JWT; role- and policy-based authorization.
- Infra: Azure; Docker; IaC (Bicep/Terraform).
- Architecture: prefer modular monolith with clear domain boundaries; propose microservices only if justified.

Output Requirements
- Sections (use concise bullets; justify key choices):
  1. Project Overview
  2. Architecture Design
  3. Technology Stack
  4. Development Phases
  5. Security Considerations
  6. Testing Strategy
  7. Deployment Plan
  8. Maintenance and Monitoring
- Include: one Mermaid high-level component diagram; measurable NFRs (throughput, p95 latency, availability); risks with mitigations; open questions.
- API rules: versioning, pagination, idempotency, error model, validation.
- Data: transactions, migrations strategy, outbox pattern if needed.
- Observability: structured logs, metrics, tracing (OpenTelemetry).
- CI/CD: build, scan, test, deploy; blue/green or canary; rollback plan.
- Length: ≤900 words.

Now produce the plan.
