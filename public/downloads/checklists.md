# Quick Reference Checklists

*From Firewall Policy Management in Modern Security Operations by Maurizio Moroni. You may adapt this template for use in your own organization. Latest version: https://firewallpolicybook.com/downloads/*

These are the operational checklists to run during day-to-day policy work. To place yourself on the maturity model, use the four stages described in Chapter 6 and score yourself with the self-assessment in Chapter 15, rather than repeating the exercise here.

## Pre-Change Validation

Run through this before pushing any firewall change:

- [ ] The business justification and owner are documented
- [ ] Source, destination, port, and protocol are confirmed, not assumed
- [ ] The rule is as narrow as the requirement allows (least privilege)
- [ ] The change was validated by policy lookup, simulation, or pre-production testing, where available
- [ ] A peer other than the author has reviewed it
- [ ] An expiry date is set for temporary access; continuing access has an owner and a review date
- [ ] A rollback step is written down

## Rule Decommissioning

Before removing a rule:

- [ ] Usage evidence supports removal: zero or negligible hits over the observation window, or the rule is shown to be redundant with equivalent enforcement, logging, and inspection
- [ ] The observation data is complete, including logging, counter resets, failover devices, and the relevant traffic paths
- [ ] Rare-use, seasonal, batch, and disaster-recovery dependencies have been checked
- [ ] Any redundant or replacement path has been validated
- [ ] The original justification has been reviewed
- [ ] Whether the systems the rule referenced still exist has been checked
- [ ] The business owner has confirmed removal is safe
- [ ] The rule has been disabled through change control and monitored for an appropriate period
- [ ] The previous configuration and the restoration procedure are retained
- [ ] Application health and unexpected denials have been checked before final deletion
- [ ] The deletion goes through change control, with monitoring for newly denied connections afterward
