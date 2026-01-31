# Go

Below are prompts for a Go developer focused on security. Select the most relevant ones for your needs and let Copilot do the rest.

## Prompt Ladder

1. **Provide an expert comparative overview of Go static/security tooling (go vet, staticcheck, govulncheck, Gosec, Semgrep, CodeQL Go queries, Sonar, commercial SAST): detection domains, false-positive pressure points, and optimal layering order for velocity vs depth.**

2. **Design a multi-stage SARIF pipeline for Go that runs staticcheck, Gosec, govulncheck, and Semgrep; normalizes severities; de-duplicates by (rule + location hash); merges into a single SARIF; and publishes to GitHub Code Scanning with baseline awareness.**

3. **Detail a hardened Go module supply-chain strategy: proxy and sumdb trust model, GONOSUMDB/GOPRIVATE handling, checksum database integrity, vendoring vs minimal version selection (MVS) risks, dependency diff gating, SBOM generation (CycloneDX + syft), and provenance/attestation via cosign + SLSA levels.**

4. **Show how to enforce reproducible and hermetic builds: pinned Go toolchain via go.env/asdf/Docker, -trimpath, -buildvcs=false, deterministic ldflags (version + commit), and module vendoring verification in CI.**

5. **Explain integrating fuzzing (native go test -fuzz) alongside sanitizers (memory/race via -race, memory sanitizer with Clang/cgo builds) and coverage-driven prioritization of fuzz targets; include resource caps and corpus seeding strategy.**

6. **Provide a secure concurrency audit prompt: detect goroutine leaks, unsafe channel patterns (unbounded sends, select default misuse), context cancellation propagation failures, time.After misuse, and data races masked by maps guarded only informally.**

7. **Outline a hardened configuration for staticcheck: enable all SA/ST/S/performance checks except selectively suppressed ones with documented justification in a central config; include approach for enforcing zero new issues via diff filtering.**

8. **Describe a govulncheck integration pattern that runs in CI, fails only on newly introduced reachable vulns, annotates PRs with advisory metadata and fix versions, and stores historical vuln trend metrics.**

9. **Show how to construct a Gosec profile that elevates crypto/injection (G401+, G501+), suppresses noise in testdata/, enforces no hardcoded credentials (credential pattern extensions), and integrates custom rules for internal APIs.**

10. **Provide a prompt for generating a policy script that ingests merged SARIF + govulncheck JSON, maps severities to org policy tiers (Block/Review/Info), enforces waiver expirations, and outputs a markdown summary table with delta counts per category.**
