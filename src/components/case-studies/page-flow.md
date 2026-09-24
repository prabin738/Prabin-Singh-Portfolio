Page flow, top to bottom
Page header (from projects.ts, shared by every project)
Breadcrumb → status → title → summary → stack chips → screenshot gallery

Case study intro (no table of contents entry)

# Block Export Shape

0 Table of contents SECTIONS (in the component) { id, label }[]
1 Fact strip (3 cards) factStrip { label, value }[]: Role, Platform, Timeline
2 Source link caseStudyLinks.github string | null. When it's null, the page says "private repository"
3 At a glance table atAGlance { label, value }[]: scope, surface, backend, languages, offline
4 TL;DR box tldr string[], three bullets: what you built, key technical idea, standout decision
Main sections (in the table of contents)

# Section Export Shape

5 The problem problem { intro, points: string[], goal }
6 Target users users { primary, secondary, constraints }
7 The solution solution { intro, parts: {title, body}[] (3 cards), features: {title, body}[] }
8 Tech stack stackGroups { label, items: string[] }[]
9 System architecture architecture Diagram nodes ({ title, subtitle?, items }), plus connector labels, publishNote and flow (a paragraph describing a request)
10 System design highlights highlights + alsoInTheCodebase { title, summary, deepDive: string[] }[] (the deep dive collapses) + string[]
11 Security securityGroups { title, items: string[] }[] (3 columns)
12 Challenges and trade-offs challenges { challenge, decision, tradeoff }[] (table)
13 Results results { stats: {label, value}[], pending: string[] }. Each pending item shows as a "Fill in" chip
14 What I learned learnings string[]
15 What's next whatsNext string[]
