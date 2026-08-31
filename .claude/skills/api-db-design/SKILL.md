---
name: api-db-design
description: สร้างหรือปรับปรุงเอกสาร API Spec และ Database Schema ของ JaiFit (conceptual, ไม่ผูกมัดกับ technology stack — entity/field, ER diagram, API operation) จาก requirement/spec, backlog, feature list และ architecture ที่มีอยู่ ใช้เมื่อผู้ใช้ขอ "สร้าง api spec", "ออกแบบ database schema", "ทำ ER diagram", "ออกแบบ data model" หรือพิมพ์ /api-db-design
---

# สร้าง API Spec และ Database Schema จาก Requirement

Skill นี้ใช้สำหรับแปลงเอกสาร requirement/backlog/feature list (และ high level architecture ถ้ามี) ให้เป็น **API Spec** และ **Database Schema** ระดับ conceptual โดยมอบหมายงานออกแบบให้ subagent `api-db-writer`

## ขั้นตอน

1. **สำรวจข้อมูลตั้งต้น** — ดูว่า `docs/01-requirements/02-plan/` มี feature list แล้วหรือยัง และ `docs/02-design/02-technical/` มี high level architecture อยู่แล้วหรือไม่ ถ้ายังไม่มี feature list เลย ให้แจ้งผู้ใช้และแนะนำให้รัน `/feature-journey` ก่อน ถ้ายังไม่มี architecture ให้แนะนำ `/architecture` แต่ยังทำงานต่อได้ถ้าผู้ใช้ต้องการ
2. **หาขอบเขตฟีเจอร์เป้าหมาย** — ถ้าผู้ใช้ระบุฟีเจอร์/พื้นที่เฉพาะเจาะจงมา ให้ใช้ตามนั้น ถ้าไม่ระบุและผู้ใช้ไม่ได้บอกให้ทำต่อเองโดยไม่ต้องถาม ให้ถามสั้น ๆ ว่าต้องการครอบคลุมฟีเจอร์ไหนบ้าง
3. **ตรวจว่ามีเอกสาร api-spec/database-schema อยู่แล้วหรือไม่** — ถ้ามีอยู่แล้ว ให้แจ้ง subagent ว่าให้ปรับปรุงไฟล์เดิม ไม่ใช่สร้างใหม่ทับ
4. **มอบหมายงานให้ subagent** — เรียก `api-db-writer` ผ่าน Agent tool พร้อม path เอกสารต้นทางที่เกี่ยวข้องทั้งหมดและขอบเขตฟีเจอร์จากขั้นตอนที่ 2 สั่งให้เขียน/ปรับปรุงทั้งสองไฟล์ลงดิสก์โดยตรงและอัปเดต `index.md`
5. **นำเสนอผลลัพธ์** — สรุปให้ผู้ใช้ทราบว่าไฟล์ถูกบันทึก/ปรับปรุงที่ไหน และเน้นย้ำหัวข้อ "สมมติฐาน/คำถามที่ต้องยืนยัน" ให้ผู้ใช้ตรวจสอบ โดยเฉพาะจุดที่กระทบข้อมูลอ่อนไหว/PDPA
6. **การแก้ไขภายหลัง** — ถ้าผู้ใช้ขอเพิ่ม entity/endpoint หรือปรับความสัมพันธ์ ให้เรียก subagent อีกครั้งพร้อมระบุว่าให้ปรับปรุงไฟล์เดิม

## หลักการสำคัญ

- เอกสารทั้งสองต้องเป็น conceptual เท่านั้น ห้ามระบุ database product/framework/ภาษาโปรแกรมเจาะจง
- Database Schema ต้องมี ER Diagram (Mermaid `erDiagram`) เป็นอย่างน้อย และทำเครื่องหมาย field ข้อมูลอ่อนไหว/สุขภาพให้ชัดเจน
- ทุก entity/operation ต้องอ้างอิงกลับไปยัง FR/Feature ID ต้นทางเสมอ ห้ามเพิ่มเอง
