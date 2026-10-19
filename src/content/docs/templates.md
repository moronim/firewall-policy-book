---
title: Templates
description: Zone-based policy structure, rule documentation form, and firewall change request template from Appendix E.
---

<!-- Generated from the book's Appendix E by scripts/sync-from-book.mjs. Edit the manuscript, not this file. -->

## Zone-Based Policy Structure

Use this as the starting shape of an inter-zone access matrix, written as application-specific flows rather than open zone pairs. Illustrative only: unlisted flows are denied, and each allowed flow requires a validated business need.

Security zones: Internet, DMZ, Internal, Guest, Critical.

| Source | Destination | Service | Conditions |
|--------|-------------|---------|------------|
| Approved external clients | Published DMZ service | Approved application ports | Designated endpoints only |
| DMZ application workload | Named internal dependency | Required service only | Documented owner and justification |
| DMZ workload | Approved external dependency | Required outbound service | Restricted destinations and documented purpose |
| Internal users and systems | Approved internet services | Required outbound services | Restricted destinations, proxied or inspected as policy requires |
| Authorized internal identity | Named critical application | Required application service | Identity, MFA, and encryption enforced by identified components (for example a ZTNA broker or identity-aware firewall) |

## Rule Documentation Form

Capture these fields for every rule so that an audit, or the next admin, can trace why the rule exists and when it should be revisited.

> FIREWALL RULE DOCUMENTATION
>
> Rule ID: \[ID\]
>
> Rule Name: \[Name\]
>
> Action: \[Allow / Deny / Drop\]
>
> Enforcement point: \[Device, policy, or cloud control\]
>
> SOURCE INFORMATION:
>
> Type: \[IP/Group/User\]
>
> Value: \[Value\]
>
> Description: \[Description\]
>
> DESTINATION INFORMATION:
>
> Type: \[IP/Group/Service\]
>
> Value: \[Value\]
>
> Description: \[Description\]
>
> PROTOCOL AND PORTS:
>
> Protocol: \[TCP/UDP/Other\]
>
> Ports: \[Ports\]
>
> SECURITY PROFILES:
>
> Antivirus: \[Yes / No / N/A with justification\]
>
> IPS: \[Yes / No / N/A with justification\]
>
> DLP: \[Yes / No / N/A with justification\]
>
> URL Filtering: \[Yes / No / N/A with justification\]
>
> Logging: \[Log at session start/end, log forwarding profile\]
>
> BUSINESS JUSTIFICATION:
>
> Purpose: \[Purpose\]
>
> Application: \[Application\]
>
> Business Owner: \[Owner\]
>
> Duration: \[Permanent/Until Date\]
>
> APPROVAL:
>
> Approved By: \[Name\]
>
> Date: \[Date\]
>
> Expires: \[Date or N/A\]
>
> Review date: \[Date\]
>
> Exception reference: \[Exception ID or N/A\]
>
> METADATA:
>
> Created: \[Date\]
>
> Last Modified: \[Date\]
>
> Change History: \[Reference\]

## Firewall Change Request Template

Use this as the record for any firewall rule change, one per change. Capture it before implementation, so the review, the rollback path, and the reason are all on file if the change is ever questioned.

> FIREWALL CHANGE REQUEST
>
> Change ID: \[RFC number\]
>
> Requested by: \[Name / team\], Date: \[Date\]
>
> Business justification: \[Why this change is needed, and for which application or service\]
>
> Change type: \[Standard / Normal / Emergency\]
>
> Risk tier: \[Low / Medium / High\]
>
> FIREWALL(S) AND ZONES AFFECTED:
>
> Device(s): \[Firewall name(s)\]
>
> Zones: \[Source zone → Destination zone\]
>
> RULE DETAIL:
>
> Action: \[Allow / Deny\]
>
> Source: \[IP / group / user\]
>
> Destination: \[IP / group / service\]
>
> Port(s) / protocol: \[e.g. TCP 443\]
>
> Application (if App-ID used): \[Application\]
>
> Logging: \[Logging configuration for the new or changed rule\]
>
> Expiry: \[Remove-by date for temporary access / review date for continuing access\]
>
> Exception reference: \[Exception ID or N/A\]
>
> Pre-change validation: \[Policy lookup, simulation, or test result\]
>
> Rollback plan: \[Exact steps to reverse this change\]
>
> Rollback triggers: \[Conditions that mean the change is reversed\]
>
> REVIEW AND APPROVAL:
>
> Reviewed by (peer): \[Name\], Date: \[Date\]
>
> Approved by: \[Name\], Date: \[Date\]
>
> IMPLEMENTATION:
>
> Implemented by: \[Name\], Date: \[Date\]
>
> Post-change verification: \[Result of connectivity / impact check\]

For the full policy behind this record, covering change categories, risk classification, roles, approval workflow, and compliance mapping, see the companion IT Change Management Policy template distributed with this book.
