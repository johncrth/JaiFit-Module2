# 02 - Technical

เก็บเอกสาร **การออกแบบเชิงเทคนิค (Technical Design)** เช่น

- System architecture / โครงสร้างระบบโดยรวม
- Database schema
- API design / data contract
- เทคโนโลยีและไลบรารีที่เลือกใช้ พร้อมเหตุผล

เอกสารในโฟลเดอร์นี้คือพิมพ์เขียวที่ทีมพัฒนาใช้อ้างอิงตอนลงมือเขียนโค้ด และเป็นฐานในการวางแผนทดสอบใน [[../../03-testing/01-test-plan/index|01-test-plan]]

## เอกสารในโฟลเดอร์นี้

- [[20260827-01-high-level-architecture|High Level Architecture]] — สถาปัตยกรรมระดับ high-level (logical component + data flow ของ journey proactive nudge, intensity mode, reward system, motivation profiling, และ signup/login) ผูกกับ technology stack ที่ตัดสินใจแล้ว: Node.js/Express + React/Vite + PostgreSQL + Claude API + Web Push/Email (ปรับปรุงรอบ pivot 2026-08-28 รอบ 3 — เปลี่ยนช่องทางจาก LINE เป็น Web App)
- [[20260827-02-database-schema|Database Schema]] — entity/field (PostgreSQL type จริง) และ ER Diagram รองรับฟีเจอร์หลักทั้งหมด รวมถึง Account/Push Subscription (FR11) และ Motivation Profiling (FR10) (ปรับปรุงรอบ pivot 2026-08-28 รอบ 3 — ผูกกับ PostgreSQL จริง, เอา `line_user_id` ออก, เพิ่ม `email`/`password_hash`/`PushSubscription`)
- [[20260827-03-api-spec|API Spec]] — REST API บน Node.js/Express พร้อม HTTP method/path ของแต่ละ operation จัดกลุ่มตามฟีเจอร์ พร้อม mapping กลับ FR/Feature รวมถึงกลุ่ม Auth (FR11) และกลุ่ม J (Motivation Profiling, FR10) (ปรับปรุงรอบ pivot 2026-08-28 รอบ 3 — ผูกกับ REST API concrete, เพิ่ม authentication ทุก endpoint, Web Push + Email fallback)
- [[20260827-04-detailed-design-proactive-nudge|Detailed Design — Proactive Nudge]] — sequence diagram ของ flow signup/login + ขอสิทธิ์ Web Push (FR11), ส่ง nudge (รวม intensity mode, message variety, downside warning, motivation profiling, ช่องทาง Web Push/Email), onboarding เก็บ motivation profile, onboarding เลือกโหมด, detect สัญญาณใกล้ล้มเลิก, และ reward system (streak/unlock) ผูกกับ stack Node.js/Express + React + PostgreSQL (ปรับปรุงรอบ pivot 2026-08-28 รอบ 3 — เปลี่ยนช่องทางจาก LINE เป็น Web App)
