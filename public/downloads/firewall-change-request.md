# Firewall Change Request Template

*From Firewall Policy Management in Modern Security Operations by Maurizio Moroni. You may adapt this template for use in your own organization. Latest version: https://firewallpolicybook.com/downloads/*

Use this as the record for any firewall rule change, one per change. Capture it before implementation, so the review, the rollback path, and the reason are all on file if the change is ever questioned.

| Field | Entry |
|----------|----------------------|
| Change ID | [RFC number] |
| Requested by | [Name / team] |
| Date | [Date] |
| Business justification | [Why this change is needed, and for which application or service] |
| Change type | [Standard / Normal / Emergency] |
| Risk tier | [Low / Medium / High] |

## Firewall(s) and zones affected

| Field | Entry |
|----------|----------------------|
| Device(s) | [Firewall name(s)] |
| Zones | [Source zone → Destination zone] |

## Rule detail

| Field | Entry |
|----------|----------------------|
| Action | [Allow / Deny] |
| Source | [IP / group / user] |
| Destination | [IP / group / service] |
| Port(s) / protocol | [e.g. TCP 443] |
| Application (if App-ID used) | [Application] |
| Logging | [Logging configuration for the new or changed rule] |
| Expiry | [Remove-by date for temporary access / review date for continuing access] |
| Exception reference | [Exception ID or N/A] |
| Pre-change validation | [Policy lookup, simulation, or test result] |
| Rollback plan | [Exact steps to reverse this change] |
| Rollback triggers | [Conditions that mean the change is reversed] |

## Review and approval

| Field | Entry |
|----------|----------------------|
| Reviewed by (peer) | [Name] |
| Date | [Date] |
| Approved by | [Name] |
| Date | [Date] |

## Implementation

| Field | Entry |
|----------|----------------------|
| Implemented by | [Name] |
| Date | [Date] |
| Post-change verification | [Result of connectivity / impact check] |

For the full policy behind this record, covering change categories, risk classification, roles, approval workflow, and compliance mapping, see the companion IT Change Management Policy template, which you can download from [firewallpolicybook.com/downloads](https://firewallpolicybook.com/downloads/).
