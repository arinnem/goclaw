# Visit Vietnam — Executive Summary

## Financial Model Overview

| Metric | Base Case | Notes |
|--------|-----------|-------|
| **NPV** | See model | Discount rate: 12% |
| **CIT applied** | 20% | Fixed from old model (was 0%) |
| **Time horizon** | H2 2025 – Q4 2030 | Monthly → quarterly granularity |
| **Revenue streams** | 6 | Cert fees, training, audit, tx fees, DaaS, advertising |
| **CAPEX** | 5,280M VND | + 18%/yr maintenance from Y2 |

## Two-Stage Business Model

**Stage 1 — Certification Platform (2025–2027)**
- Revenue: Certification fees + training + audit
- Gate to Stage 2: ≥300 certified enterprises
- Focus: Build base, prove product-market fit

**Stage 2 — Transaction Platform (2028–2030)**
- Revenue: Transaction fees (2% of GMV) + DaaS + advertising
- Activated only if Stage 1 gate is met
- Focus: Scale via network effects

## Key Fixes from Previous Model

| Issue | Old model | New model |
|-------|-----------|-----------|
| Tax | 0% (missing) | **CIT 20% applied** |
| Enterprise growth | Linear 10→7,000 (700x) | **S-curve, max 3,000 (Base)** |
| Market share | 25% of all e-tourism | **2% (Base case)** |
| COGS | Missing | **Payment processing 2.5%** |
| Maintenance CAPEX | 0 after Y1 | **18%/yr from Y2** |
| Working capital | Not modeled | **AR/AP based on collection days** |
| Time granularity | Annual only | **Monthly 2025–2027, Quarterly 2028–2030** |
| HR scaling | Flat 20 people | **16→65, tied to enterprise count** |
| NPV formula | Two conflicting formulas | **Single consistent formula** |

## Scenarios

| Parameter | Bull | Base | Bear | Failure |
|-----------|------|------|------|---------|
| Max enterprises | 3,000 | 1,500 | 500 | 100 |
| Market share | 5% | 2% | 0.5% | 0% |
| Churn rate | 10% | 15% | 25% | 40% |

## How to Use the Model

1. Open `VisitVietnam_FinancialModel.xlsx`
2. Go to **Assumptions** sheet — all yellow cells are editable
3. Change any placeholder value → entire model recalculates
4. Check **Dashboard** for summary KPIs and annual view
5. **Sensitivity** sheet shows impact ranges

## Placeholder Values

All unknowns use example values (blue font on yellow background). Replace with real data as it becomes available:

- Market data (TAM/SAM, e-commerce market size)
- Adoption parameters (ceiling, steepness, churn)
- Pricing (cert fee, take rate, DaaS pricing)
- HR (headcount plan, salary levels)
- Cost benchmarks (cloud, marketing, recruitment)
