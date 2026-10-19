# Zone-Based Policy Structure

*From Firewall Policy Management in Modern Security Operations by Maurizio Moroni. Latest version: https://firewallpolicybook.com/downloads/*

Use this as the starting shape of an inter-zone access matrix, written as application-specific flows rather than open zone pairs. Illustrative only: unlisted flows are denied, and each allowed flow requires a validated business need.

Security zones: Internet, DMZ, Internal, Guest, Critical.

| Source | Destination | Service | Conditions |
|--------|-------------|---------|------------|
| Approved external clients | Published DMZ service | Approved application ports | Designated endpoints only |
| DMZ application workload | Named internal dependency | Required service only | Documented owner and justification |
| DMZ workload | Approved external dependency | Required outbound service | Restricted destinations and documented purpose |
| Internal users and systems | Approved internet services | Required outbound services | Restricted destinations, proxied or inspected as policy requires |
| Authorized internal identity | Named critical application | Required application service | Identity, MFA, and encryption enforced by identified components (for example a ZTNA broker or identity-aware firewall) |
