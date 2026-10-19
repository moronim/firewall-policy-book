# IT Change Management Policy — Companion Template

*From Firewall Policy Management in Modern Security Operations by Maurizio Moroni. Latest version: https://firewallpolicybook.com/downloads/*

This is a companion template, not a chapter — a complete, ready-to-adapt corporate change-management policy you can hand to your organization as a starting point, rather than something to read front to back.

Firewall changes are where good policy management most often comes undone: a rushed rule during an incident, no review, no rollback plan, and no record of why. Putting those changes through real change control is what prevents that, which is why this book hands you a full policy to start from instead of leaving you to write one from scratch.

Treat every value here as a default to tailor. The roles, risk tiers, approval thresholds, review cadences, and tool names are examples—replace them with your own. Most of this document governs all IT change, not just firewalls; if your remit is narrower, keep the sections on change categories, risk classification, the request-review-approve-implement workflow, rollback procedures, and the six-monthly firewall review, and set the rest aside. The short, firewall-specific starting point lives in the book's Appendix E as the Firewall Change Request Template; this is the full policy it grows into.

### Document Control Information

| Attribute | Details |
|----|----|
| Document Title | IT Change Management Policy |
| Version | 1.0 |
| Effective Date | December 1, 2025 |
| Review Cycle | Annual |
| Document Owner | Chief Information Security Officer (CISO) |
| Approval Authority | CISO, IT Leadership |
| Scope | All IT infrastructure changes across multi-cloud, hybrid, and on-premises environments |

## 1. PURPOSE AND SCOPE

### 1.1 Purpose

This Change Management Policy establishes the framework, procedures, and responsibilities for managing changes to IT infrastructure, systems, and services. The policy ensures that all changes are executed in a controlled manner to minimize business disruption, maintain system stability, and meet regulatory compliance requirements including PCI-DSS, ISO 27001, GDPR, NIS2, and DORA.

### 1.2 Scope

This policy applies to: - All IT infrastructure changes including servers, network devices, firewalls, security appliances, cloud resources, applications, and databases - Multi-cloud environments (Azure, AWS, GCP), hybrid infrastructure, and on-premises systems - Changes initiated manually, through ServiceNow, or automated via Infrastructure as Code (IaC) tools including Terraform, Ansible, and GitHub Actions - All IT personnel, distributed teams, security teams, network teams, technical leads, third-party vendors, and contractors

### 1.3 Objectives

- Reduce unplanned outages and service disruptions

- Ensure compliance with regulatory frameworks (PCI-DSS, ISO 27001, GDPR, NIS2, DORA)

- Standardize change processes across distributed teams

- Enable rapid, safe changes while maintaining control

- Provide clear audit trails for all infrastructure modifications

- Implement segregation of duties between change approval and implementation

## 2. DEFINITIONS

| Term | Definition |
|----|----|
| **Change** | Any addition, modification, or removal of IT infrastructure components that could affect services |
| **Change Requester** | Individual or team initiating a change request |
| **Change Implementer** | Personnel responsible for executing approved changes (must be different from approver) |
| **Change Advisory Board (CAB)** | Group of stakeholders who assess and approve high-risk changes |
| **CISO** | Chief Information Security Officer with authority for emergency change approval |
| **RFC** | Request for Change - formal documentation of proposed change |
| **Rollback** | Process of reverting systems to pre-change state |
| **IaC** | Infrastructure as Code - automated infrastructure provisioning |
| **CI/CD** | Continuous Integration/Continuous Deployment pipelines |

## 3. CHANGE CATEGORIES AND RISK CLASSIFICATION

### 3.1 Change Categories

*3.1.1 Standard Changes (Pre-Approved)*

- Low-risk, routine changes with documented procedures

- Pre-approved by CISO or technical leads

- Examples: security patch deployment, firewall rule updates via AlgoSec workflows, SSL certificate renewals, routine backups, standard user account provisioning

- **Approval Required:** None (pre-authorized in policy)

- **Documentation:** Simplified RFC in ServiceNow

- **Execution Window:** Any time within maintenance windows

*3.1.2 Normal Changes*

- Planned changes requiring evaluation and approval

- Follow standard assessment and approval workflow

- Examples: infrastructure upgrades, new service deployments, network topology modifications, cloud resource provisioning

- **Approval Required:** Technical Lead approval (Low/Medium risk) or CAB approval (High risk)

- **Documentation:** Full RFC in ServiceNow

- **Execution Window:** Scheduled maintenance windows

*3.1.3 Emergency Changes*

- Urgent changes required to restore service or address critical security incidents

- Expedited approval process with post-implementation review

- Examples: critical security vulnerability remediation, system outage recovery, zero-day exploit mitigation

- **Approval Required:** CISO approval (must be obtained within 2 hours)

- **Documentation:** Emergency RFC with post-implementation documentation within 24 hours

- **Execution Window:** Immediate upon approval

### 3.2 Risk Classification Matrix

| Risk Level | Impact | Approval Authority | Testing Required | Rollback Plan | Notification |
|----|----|----|----|----|----|
| **Low** | Single non-production system or minimal user impact | Technical Lead | Dev/Test environment | Optional | Team notification |
| **Medium** | Multiple systems, limited production impact | Technical Lead + Security Team Lead | Staging environment mandatory | Mandatory | Stakeholder email notification |
| **High** | Production systems, multiple services, significant user impact | CAB (CISO, Technical Leads, Security, Network) | Full UAT in staging | Mandatory with tested procedure | Stakeholder email + management notification |
| **Critical** | Core infrastructure, customer-facing services, regulatory systems | CAB + CISO Final Approval | Complete regression testing | Mandatory with automated rollback | Enterprise-wide email + executive notification |

### 3.3 Risk Assessment Criteria

Changes must be assessed against the following criteria to determine risk level:

**Impact Assessment:** - Number of systems affected - Number of users impacted - Business criticality of affected systems - Potential for data loss or security exposure - Regulatory/compliance implications (PCI-DSS cardholder data environment, GDPR personal data systems, DORA critical ICT services)

**Complexity Assessment:** - Technical complexity of implementation - Number of teams involved - Dependencies on other systems or changes - Reversibility and rollback complexity - Change implementation duration

## 4. CHANGE MANAGEMENT PROCESS

### 4.1 Change Request Submission (RFC Creation)

All changes must be documented in ServiceNow with the following information:

**Mandatory RFC Fields:** 1. **Change Description:** Clear summary of what is being changed and why 2. **Business Justification:** Business need, compliance requirement, or security rationale 3. **Risk Classification:** Low, Medium, High, or Critical (based on Section 3.2) 4. **Affected Systems:** Complete list of systems, services, devices, and environments 5. **Implementation Plan:** Step-by-step procedure with timing estimates 6. **Rollback Plan:** Detailed reversal procedure with decision criteria 7. **Testing Plan:** Pre-implementation testing completed and results 8. **Impact Analysis:** Potential disruptions, dependencies, and user impact 9. **Implementation Window:** Proposed date/time with timezone 10. **Implementer(s):** Personnel executing the change (must differ from approver) 11. **Communication Plan:** Stakeholder notification approach for production changes

**For Automated Changes (IaC/GitHub Actions):** - Include repository link, commit hash, and pipeline job ID - Attach Terraform plan output or Ansible playbook - Document automated testing results (unit tests, integration tests) - Specify automated rollback triggers and procedures

### 4.2 Change Review and Approval Workflow

*4.2.1 Standard Changes (Pre-Approved)*

1.  Submit simplified RFC in ServiceNow

2.  Auto-approved upon submission if criteria match pre-approved templates

3.  Execute change within defined parameters

4.  Update RFC with implementation results

*4.2.2 Normal Changes*

**Low Risk:** 1. Technical Lead reviews RFC within 2 business days 2. Security team notified for review (informational) 3. Approval granted or change requested 4. Schedule implementation

**Medium Risk:** 1. Technical Lead + Security Team Lead review within 3 business days 2. Both approvals required before scheduling 3. Staging environment testing validation required 4. Stakeholder notification via email 48 hours before implementation

**High Risk:** 1. RFC submitted to CAB 5 business days before proposed implementation 2. CAB meeting convened (CISO, Technical Leads, Security, Network, Business Representatives) 3. Full risk assessment and impact analysis conducted 4. CAB votes on approval (majority required) 5. Stakeholder notification via email 72 hours before implementation 6. Executive management notified

**Critical Risk:** 1. RFC submitted to CAB 7 business days before proposed implementation 2. CAB review + CISO final approval mandatory 3. Complete regression testing in production-like environment 4. Rehearsal of implementation and rollback procedures 5. Enterprise-wide communication 5 business days in advance 6. Executive sign-off required

*4.2.3 Emergency Changes*

1.  Emergency RFC created in ServiceNow (can be brief)

2.  CISO contacted immediately via phone/emergency escalation

3.  CISO approval obtained within 2 hours (verbal approval acceptable, documented in RFC)

4.  Implement change immediately upon approval

5.  Post-implementation CAB review within 48 hours

6.  Full documentation completed within 24 hours of implementation

**Segregation of Duties:** - Change approvers cannot implement changes they approved - For small teams, peer review by second technical resource required - Automated changes must have code review by different engineer than author

### 4.3 Change Implementation

*4.3.1 Pre-Implementation Checklist*

- [ ] RFC approved by required authority

- [ ] Rollback plan documented and tested

- [ ] Backup/snapshot of affected systems completed

- [ ] Testing completed in appropriate environment

- [ ] Stakeholder notifications sent (if production change)

- [ ] Implementation team briefed on procedures

- [ ] Monitoring and alerting systems checked

- [ ] Communication channel established (email, Teams, or on-call bridge)

*4.3.2 Implementation Standards*

- Follow documented implementation plan step-by-step

- Document actual start/end times in ServiceNow RFC

- Maintain real-time communication during implementation

- Monitor system health and performance metrics continuously

- Document any deviations from planned procedure

- Capture configuration backups before and after change

*4.3.3 For Automated Changes (IaC/CI/CD)*

- Changes triggered via approved GitHub Actions pipelines or Terraform workflows

- Pipeline executions logged and linked to ServiceNow RFC

- Automated pre-checks must pass before execution (syntax validation, security scanning, policy compliance)

- Automated rollback triggered on failure thresholds

- Human approval gate required for production deployments

- All pipeline runs auditable with commit history

### 4.4 Change Verification and Validation

**Post-Implementation Validation:** - Verify intended functionality achieved - Confirm no unintended side effects or errors - Validate system performance within acceptable parameters - Test dependent systems and integrations - Review monitoring alerts and logs - Confirm compliance with security policies - Document validation results in RFC

**Success Criteria:** - All systems operational within SLA parameters - No critical errors or alerts generated - Functionality tests passed - User acceptance obtained (where applicable) - No immediate rollback required

### 4.5 Rollback Procedures

### Rollback Decision Criteria:

Immediate rollback required if: - Critical functionality failure detected - Security vulnerability introduced - Data integrity compromised - System performance degraded beyond acceptable thresholds (\>20% performance impact) - Unforeseen dependencies causing cascading failures - Implementation cannot be completed within planned window

**Rollback Execution:** 1. **Decision:** Change implementer or on-call lead declares rollback 2. **Notification:** Immediate notification to stakeholders via email and established communication channel 3. **Execution:** Follow documented rollback procedure in RFC 4. **Verification:** Validate system returned to pre-change state 5. **Documentation:** Record rollback actions, timeline, and reasons in ServiceNow RFC 6. **Post-Mortem:** Conduct root cause analysis within 5 business days

**Automated Rollback:** - IaC-managed changes should leverage version control for automated reversion (Terraform state rollback, Ansible playbook reversal) - CI/CD pipelines must include automated rollback triggers based on health checks - Automated rollbacks must still be documented in ServiceNow within 4 hours

### 4.6 Change Closure and Documentation

**Change Closure Requirements:** - Update RFC with final implementation status (Success, Success with Issues, Failed, Rolled Back) - Document actual vs. planned timeline - Capture lessons learned and improvement opportunities - Attach final configuration files, logs, or evidence - Update CMDB (Configuration Management Database) with asset changes - Archive all related communications and approvals - Close RFC in ServiceNow

**Retention Period:** - Change and audit-log records retained for at least the period required by applicable regulation; note that PCI DSS requires audit-log retention of at least 12 months, with the most recent 3 months immediately available (Req 10.5.1), while ISO 27001 leaves the period organization-defined and DORA does not fix a specific figure. This policy adopts a 7-year retention as an internal standard where longer retention is desired for legal or financial reasons - Critical system changes retained indefinitely - Audit trail immutable and tamper-evident

## 5. ROLES AND RESPONSIBILITIES

### 5.1 Chief Information Security Officer (CISO)

- Final approval authority for emergency changes

- Chair of Change Advisory Board

- Oversight of change management compliance

- Authority to suspend or expedite changes based on security risk

- Approval of policy updates and exceptions

### 5.2 Change Advisory Board (CAB)

**Members:** CISO, Technical Leads, Security Team Lead, Network Team Lead, Business Representatives

**Responsibilities:** - Review and approve high-risk and critical changes - Assess risk and business impact of proposed changes - Resolve conflicts between competing change requests - Review emergency change post-implementation - Conduct periodic change management process reviews - Meet bi-weekly or as-needed for high-priority changes

### 5.3 Technical Leads (Distributed IT Teams)

- Approve low and medium-risk changes within their domain

- Conduct technical feasibility assessments

- Mentor teams on change procedures

- Ensure changes align with architectural standards

- Participate in CAB reviews for high-risk changes

- Monitor change success rates and process improvements

### 5.4 Change Requester

- Complete RFC with accurate and comprehensive information

- Justify business need and risk assessment

- Coordinate with affected teams and stakeholders

- Provide implementation and rollback plans

- Support testing and validation activities

- Update RFC throughout change lifecycle

### 5.5 Change Implementer

- Execute approved changes according to documented procedures

- Maintain segregation of duties (cannot approve own changes)

- Perform pre-implementation validation and backups

- Monitor implementation progress and system health

- Execute rollback if necessary

- Document implementation results and any deviations

### 5.6 Security Team

- Review changes for security implications (especially firewall, network, access control changes)

- Ensure compliance with security policies and frameworks

- Validate changes to security controls and monitoring systems

- Assess risk to PCI-DSS, ISO 27001, GDPR, NIS2, DORA compliance

- Participate in CAB for high-risk changes

- Conduct security testing post-implementation

### 5.7 Network Team

- Review network infrastructure changes (routing, switching, firewall, VPN, load balancer changes)

- Validate network architecture and topology changes

- Ensure network segmentation and security zone integrity

- Coordinate with security team on firewall policy changes

- Monitor network performance post-change

## 6. COMPLIANCE AND REGULATORY REQUIREMENTS

### 6.1 PCI-DSS Requirements

- All changes to cardholder data environment (CDE) classified as minimum Medium risk

- Reviews of firewall/router (network security control) configurations at least once every six months, per PCI DSS Req 1.2.7 (Standard Change process)

- Maintain audit logs of all changes to CDE systems, retained for at least 12 months with the most recent 3 months immediately available (PCI DSS Req 10.5.1)

- Testing required before implementing changes affecting CDE

- Segregation of duties enforced for CDE changes

### 6.2 ISO 27001 Requirements

- Changes to information security controls require risk assessment

- Management approval for changes affecting security posture

- Configuration management and version control for all systems

- Regular review of change management effectiveness (annual audit)

- Documented procedures for emergency changes

### 6.3 GDPR Requirements

- Data Protection Impact Assessment (DPIA) for changes to processing that is likely to result in a high risk to individuals' rights and freedoms (GDPR Art. 35)

- Privacy team notification for changes to data storage, processing, or access controls

- Documentation of technical and organizational measures

- Incident reporting alignment with 72-hour breach notification requirement

### 6.4 NIS2 (Network and Information Security Directive 2)

- Risk management measures for changes to network and information systems

- Incident handling procedures aligned with change management

- Supply chain security considerations for third-party changes

- Reporting obligations for significant incidents caused by changes, following the NIS2 Art. 23 stages: an early warning within 24 hours, an incident notification within 72 hours, and a final report within one month

### 6.5 DORA (Digital Operational Resilience Act)

- Changes to critical ICT services classified as minimum High risk

- ICT risk management framework integration

- Testing of business continuity and disaster recovery capabilities

- Third-party ICT service provider change management

- Incident reporting for major ICT-related incidents within required timelines (initial notification no later than 4 hours after the incident is classified as major, and within 24 hours of becoming aware of it; intermediate report within 72 hours; final report within one month)

### 6.6 Audit and Compliance Reporting

- Monthly change metrics dashboard (success rate, rollback rate, emergency changes)

- Quarterly compliance report to CISO and executive management

- Annual independent audit of change management processes

- Ad-hoc audit support for regulatory examinations

- Change records available for compliance audits with full traceability

## 7. CHANGE WINDOWS AND SCHEDULING

### 7.1 Standard Maintenance Windows

**Production Systems:** - **Primary Window:** Saturday 22:00 - Sunday 06:00 CET - **Secondary Window:** Wednesday 22:00 - Thursday 02:00 CET

**Non-Production Systems:** - **Development:** Anytime (no approval required for dev-only) - **Test/Staging:** Monday-Friday 08:00 - 18:00 CET

**Cloud Environments:** - Follow same windows as production/non-production classification - Consider regional time zones for multi-region deployments

### 7.2 Change Freeze Periods

- Year-end holidays: December 20 - January 5 (only emergency changes)

- Major business events: As communicated by business leadership (minimum 30-day notice)

- Post-major-incident stabilization: 72 hours following critical incident resolution

- Exceptions: CISO approval required for changes during freeze periods

### 7.3 Change Conflicts and Coordination

- ServiceNow change calendar provides visibility into scheduled changes

- Conflicting changes to same system or dependent systems require coordination

- High-risk changes should not be scheduled concurrently

- Minimum 24-hour gap between production changes to same system (unless part of coordinated implementation)

## 8. COMMUNICATION REQUIREMENTS

### 8.1 Stakeholder Notification Standards

**Low-Risk Changes:** - Team-level notification via email or Teams channel - No advance notice required (post-implementation summary acceptable)

**Medium-Risk Changes:** - Stakeholder email notification 48 hours in advance - Include: change summary, implementation window, expected impact, contact information - Post-implementation status update via email

**High-Risk Changes:** - Stakeholder email notification 72 hours in advance - Management briefing if significant user impact - Status updates during implementation window (start, milestones, completion) - Post-implementation report within 24 hours

**Critical Changes:** - Enterprise-wide email notification 5 business days in advance - Executive management briefing - User-facing communication if customer impact expected - Real-time status updates during implementation - Formal post-implementation report within 48 hours

**Emergency Changes:** - Immediate notification to CISO and affected stakeholders - Real-time updates during incident resolution - Post-implementation notification within 4 hours - Detailed incident report within 24 hours

### 8.2 Communication Channels

- **Primary:** Corporate email for formal notifications

- **Implementation Coordination:** Microsoft Teams or dedicated change bridge line

- **Emergency Escalation:** On-call rotation and emergency contact procedures

- **Status Updates:** ServiceNow portal and change calendar

### 8.3 Communication Templates

ServiceNow will maintain standardized templates for: - Change notification emails - Status update messages - Rollback notifications - Post-implementation summaries

## 9. METRICS AND CONTINUOUS IMPROVEMENT

### 9.1 Key Performance Indicators (KPIs)

| Metric | Target | Measurement Frequency |
|----|----|----|
| Change Success Rate | ≥95% | Monthly |
| Emergency Change Percentage | ≤10% of total changes | Monthly |
| Changes Requiring Rollback | ≤3% | Monthly |
| Average Change Approval Time (Normal) | ≤3 business days | Monthly |
| Change-Related Incidents | ≤2% of total incidents | Quarterly |
| Unauthorized Changes | 0 | Monthly |
| Compliance Violations | 0 | Quarterly |
| RFC Documentation Completeness | 100% | Monthly |

### 9.2 Reporting and Review

- **Monthly:** Change metrics dashboard distributed to IT leadership

- **Quarterly:** CAB review of process effectiveness and improvement opportunities

- **Annual:** Comprehensive policy review and update

- **Post-Major-Incident:** Root cause analysis and process improvement recommendations

### 9.3 Continuous Improvement Process

1.  **Collect Feedback:** Gather input from change requesters, implementers, and stakeholders

2.  **Analyze Trends:** Identify recurring issues, bottlenecks, and failure patterns

3.  **Propose Improvements:** Document recommendations for process enhancements

4.  **Implement Changes:** Update policy, procedures, or tools based on approved improvements

5.  **Monitor Results:** Measure impact of improvements against KPIs

### 9.4 Common Improvement Areas

- Streamlining approval workflows for automated changes

- Expanding pre-approved standard change catalog

- Enhancing rollback automation capabilities

- Improving communication templates and notification processes

- Integrating additional compliance checks into ServiceNow workflows

## 10. EXCEPTIONS AND NON-COMPLIANCE

### 10.1 Policy Exception Process

- Exceptions to this policy require CISO written approval

- Exception request must include: justification, risk assessment, compensating controls, duration

- Exceptions documented in ServiceNow with unique identifier

- Exceptions reviewed quarterly for continued validity

- Emergency exceptions granted verbally, documented within 24 hours

### 10.2 Non-Compliance Consequences

- Unauthorized changes subject to disciplinary action

- Repeated violations may result in access revocation

- Non-compliance incidents reported to management and HR

- Compliance violations included in performance evaluations

- Serious violations may result in termination

### 10.3 Incident Escalation for Change-Related Issues

1.  **Severity 1 (Critical):** Immediate CISO notification + incident response team activation

2.  **Severity 2 (High):** Technical lead notification + CAB emergency meeting within 24 hours

3.  **Severity 3 (Medium):** Standard incident process + change process review

4.  **Severity 4 (Low):** Document as lessons learned + address in next CAB meeting

## 11. TRAINING AND AWARENESS

### 11.1 Required Training

- **All IT Staff:** Change management policy overview (annual)

- **Change Implementers:** Detailed change procedures and ServiceNow training (upon hire, annual refresh)

- **Technical Leads:** CAB processes and approval criteria (semi-annual)

- **New Hires:** Change management fundamentals within first 30 days

### 11.2 Training Materials

- Online learning modules in LMS (Learning Management System)

- Quick reference guides for RFC submission

- Video tutorials for ServiceNow change workflows

- Runbooks for common standard changes

### 11.3 Awareness Activities

- Quarterly “lessons learned” sessions highlighting change successes and failures

- Monthly newsletter with change management tips and updates

- Recognition program for teams with excellent change management practices

## 12. TOOLS AND TECHNOLOGY

### 12.1 ServiceNow Platform

- Primary change management system of record

- RFC workflow automation and approval routing

- Integration with CMDB for asset tracking

- Change calendar and conflict detection

- Reporting and analytics dashboards

- Audit trail and compliance reporting

### 12.2 Infrastructure as Code (IaC) Integration

- **Terraform:** State management and change tracking integrated with ServiceNow

- **Ansible:** Playbook execution logs linked to RFC records

- **GitHub Actions:** Pipeline execution triggers RFC creation/updates automatically

- Version control systems (Git) provide change audit trail

- Automated pre-checks validate compliance before execution

### 12.3 Monitoring and Alerting

- Real-time system health monitoring during change implementation

- Automated alerts for abnormal behavior post-change

- Integration with incident management for change-related issues

- Dashboards for change success/failure visibility

### 12.4 Communication Tools

- Microsoft Teams for coordination during implementations

- Email for formal notifications and stakeholder communication

- ServiceNow portal for change calendar visibility

## 13. APPENDICES

### Appendix A: RFC Template (Standard)

Complete ServiceNow RFC template with all mandatory fields outlined in Section 4.1

### Appendix B: Risk Assessment Matrix

Detailed risk scoring worksheet based on impact and complexity criteria

### Appendix C: Standard Change Catalog

List of pre-approved standard changes with documented procedures: - Security patch deployment (OS, applications, firmware) - SSL/TLS certificate renewal - Firewall rule updates via AlgoSec workflow - User account provisioning/deprovisioning - Routine backup and restore operations - DNS record updates (non-critical systems)

### Appendix D: Communication Templates

Email templates for different change notification scenarios

### Appendix E: Compliance Checklist

Quick reference for PCI-DSS, ISO 27001, GDPR, NIS2, and DORA requirements

### Appendix F: Rollback Decision Tree

Flowchart to guide rollback decision-making process

### Appendix G: Glossary of Terms

Comprehensive definitions of technical terms and acronyms

### Appendix H: Contact Directory

CISO, CAB members, technical leads, and emergency escalation contacts

## 14. DOCUMENT REVISION HISTORY

| Version | Date             | Author        | Changes                 | Approval |
|---------|------------------|---------------|-------------------------|----------|
| 1.0     | December 1, 2025 | IT Department | Initial policy creation | CISO     |

## 15. APPROVAL AND ACKNOWLEDGMENT

This Change Management Policy has been reviewed and approved by:

| Role               | Name | Signature | Date |
|--------------------|------|-----------|------|
| CISO               |      |           |      |
| IT Director        |      |           |      |
| Security Team Lead |      |           |      |
| Network Team Lead  |      |           |      |

**Acknowledgment:** All IT personnel must acknowledge receipt and understanding of this policy within 30 days of publication.

### END OF DOCUMENT
