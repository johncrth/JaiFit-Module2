---
name: architecture
description: สร้างหรือปรับปรุงเอกสาร High Level Architecture ของ JaiFit (conceptual, ไม่ผูกมัดกับ technology stack — logical component, data flow ตาม user journey) จาก requirement/spec, backlog, feature list และ user journey ที่มีอยู่ ใช้เมื่อผู้ใช้ขอ "สร้าง architecture", "ทำ high level design", "วาด data flow", "ออกแบบสถาปัตยกรรมระบบ" หรือพิมพ์ /architecture
---

# สร้าง High Level Architecture จาก Requirement

Skill นี้ใช้สำหรับแปลงเอกสาร requirement/backlog/feature list/user journey ให้เป็น **High Level Architecture** ระดับ conceptual โดยมอบหมายงานออกแบบให้ subagent `architecture-writer`

## ขั้นตอน

1. **สำรวจข้อมูลตั้งต้น** — ดูว่า `docs/01-requirements/02-plan/` มี feature list และ `docs/02-design/01-prototypes/` มี user journey แล้วหรือยัง ถ้ายังไม่มีเลย ให้แจ้งผู้ใช้และแนะนำให้รัน `/feature-journey` ก่อน แทนที่จะให้ subagent เดาเอง
2. **หา journey/scope เป้าหมาย** — ถ้าผู้ใช้ระบุ journey หรือขอบเขตที่ต้องการทำ data flow มาชัดเจน ให้ใช้ตามนั้น ถ้าไม่ระบุและผู้ใช้ไม่ได้บอกให้ทำต่อเองโดยไม่ต้องถาม ให้ถามสั้น ๆ ว่าต้องการ data flow ของ journey ไหนเป็นหลัก
3. **ตรวจว่ามีเอกสาร architecture อยู่แล้วหรือไม่** — ถ้ามีอยู่แล้วใน `docs/02-design/02-technical/` ให้แจ้ง subagent ว่าให้ปรับปรุงไฟล์เดิม ไม่ใช่สร้างใหม่ทับ
4. **มอบหมายงานให้ subagent** — เรียก `architecture-writer` ผ่าน Agent tool พร้อม path เอกสารต้นทางที่เกี่ยวข้องทั้งหมดและ journey/scope เป้าหมายจากขั้นตอนที่ 2 สั่งให้เขียน/ปรับปรุงไฟล์ลงดิสก์โดยตรงและอัปเดต `index.md`
5. **นำเสนอผลลัพธ์** — สรุปให้ผู้ใช้ทราบว่าไฟล์ถูกบันทึก/ปรับปรุงที่ไหน และเน้นย้ำหัวข้อ "สมมติฐาน/คำถามที่ต้องยืนยัน" ให้ผู้ใช้ตรวจสอบ
6. **การแก้ไขภายหลัง** — ถ้าผู้ใช้ขอปรับ component, เพิ่ม data flow ของ journey อื่น หรือแก้ NFR ให้เรียก subagent อีกครั้งพร้อมระบุว่าให้ปรับปรุงไฟล์เดิม

## หลักการสำคัญ

- เอกสารนี้ต้องเป็น conceptual เท่านั้น ห้ามระบุชื่อเทคโนโลยี/ภาษาโปรแกรม/ผลิตภัณฑ์เจาะจง
- Component ทุกตัวต้องมี FR/Feature รองรับจริงในเอกสารต้นทาง ห้ามเพิ่มเอง
- ต้องมี data flow diagram (Mermaid) อย่างน้อย 1 journey และตาราง mapping component → FR/Feature เสมอ
