---
name: feature-journey
description: สร้าง Feature List (ตารางสรุปฟีเจอร์พร้อม MoSCoW) และ User Journey (Mermaid diagram พร้อม mapping กลับไปยัง requirement) ของ JaiFit จากเอกสาร requirement/spec และ backlog ที่มีอยู่ ใช้เมื่อผู้ใช้ขอ "สร้าง feature list", "ทำ user journey", "วาด user flow", "แตก requirement เป็น feature list/journey" หรือพิมพ์ /feature-journey
---

# สร้าง Feature List และ User Journey จาก Requirement

Skill นี้ใช้สำหรับแปลงเอกสารใน `docs/01-requirements/01-spec/` และ `docs/01-requirements/backlog.md` ให้เป็น **Feature List** (ตารางฟีเจอร์จัดลำดับความสำคัญ) และ **User Journey** (Mermaid diagram ของ flow สำคัญ พร้อม mapping กลับไปยัง requirement) โดยมอบหมายงานวิเคราะห์เชิงลึกให้ subagent `feature-journey-writer`

## ขั้นตอน

1. **สำรวจข้อมูลตั้งต้น** — Glob/Read ดูว่า `docs/01-requirements/01-spec/` และ `docs/01-requirements/backlog.md` มีเนื้อหาอะไรอยู่แล้วบ้าง ถ้าแทบว่างเปล่า ให้แจ้งผู้ใช้ว่ายังไม่มี requirement ให้ทำงานต่อ แนะนำให้รัน `/product-backlog` หรือสร้าง spec ก่อน แทนที่จะเดาเอาเอง

2. **หา flow เป้าหมายของ User Journey** — ถ้าผู้ใช้ระบุ flow ที่ต้องการมาชัดเจน (เช่น "flow ส่ง nudge ก่อนเวลาเสี่ยง") ให้ใช้ตามนั้น ถ้าไม่ระบุและผู้ใช้ไม่ได้บอกให้ทำต่อเองโดยไม่ต้องถาม ให้ถามสั้น ๆ ว่าต้องการ journey ของ flow ไหน; ถ้าผู้ใช้บอกให้เลือก default เอง ให้เลือก flow ที่มี priority "Must" และกระทบปัญหาหลักของโปรเจกต์มากที่สุด

3. **มอบหมายงานให้ subagent** — เรียก `feature-journey-writer` ผ่าน Agent tool พร้อม:
   - path ของเอกสารต้นทางที่เกี่ยวข้อง (`docs/01-requirements/01-spec/*.md`, `docs/01-requirements/backlog.md`)
   - flow เป้าหมายของ User Journey (จากขั้นตอนที่ 2)
   - target output path ถ้าผู้ใช้ระบุมา (ถ้าไม่ระบุ ให้ subagent ใช้ default path ของมันเอง: Feature List → `docs/01-requirements/02-plan/`, User Journey → `docs/02-design/01-prototypes/`)
   - สั่งให้ subagent เขียนไฟล์ลงดิสก์โดยตรงด้วย Write/Edit และอัปเดต `index.md` ของโฟลเดอร์ปลายทางให้ลิงก์มาหาไฟล์ใหม่

4. **นำเสนอผลลัพธ์** — สรุปให้ผู้ใช้ทราบว่าไฟล์ถูกบันทึกไว้ที่ไหนบ้าง และเน้นย้ำหัวข้อ "สมมติฐาน/คำถามที่ต้องยืนยัน" ในแต่ละเอกสารให้ผู้ใช้ตรวจสอบ

5. **การแก้ไขภายหลัง** — ถ้าผู้ใช้ขอปรับ priority, เพิ่ม/ลบฟีเจอร์, หรือแก้ไข journey ให้แก้ไฟล์ที่มีอยู่ด้วย Edit แบบเจาะจงจุด แทนที่จะสร้างใหม่ทั้งฉบับ

## หลักการสำคัญ

- ห้ามใส่ฟีเจอร์หรือ step ที่ไม่มีหลักฐานในเอกสาร requirement/backlog ให้ระบุเป็นสมมติฐานที่ต้องยืนยันแทนการเดาเงียบ ๆ
- รักษารูปแบบเอกสารให้สอดคล้องกับ convention เดิมของ `docs/` ในโปรเจกต์ (ภาษาไทย, โครงสร้าง index.md, wikilink อ้างอิงข้ามโฟลเดอร์)
- Feature List ต้องจัดลำดับความสำคัญแบบ MoSCoW และอ้างอิงกลับไปยัง FR/Epic ต้นทางเสมอ
- User Journey ต้องใช้ Mermaid diagram และมีตาราง mapping ทุก step กลับไปยัง requirement ข้อที่เกี่ยวข้อง
