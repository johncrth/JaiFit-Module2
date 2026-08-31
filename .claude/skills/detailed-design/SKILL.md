---
name: detailed-design
description: สร้างหรือปรับปรุงเอกสาร Detailed Design ของ JaiFit (conceptual, ไม่ผูกมัดกับ technology stack — sequence diagram, error handling ต่อ flow เฉพาะเจาะจง) จาก user journey, architecture และ api/database spec ที่มีอยู่ ใช้เมื่อผู้ใช้ขอ "ทำ detailed design", "วาด sequence diagram", "ออกแบบ flow แบบละเอียด" หรือพิมพ์ /detailed-design
---

# สร้าง Detailed Design จาก User Journey และ Architecture

Skill นี้ใช้สำหรับแปลง user journey (และ high level architecture / api-db spec ถ้ามี) ให้เป็น **Detailed Design** ระดับ conceptual ของ flow เฉพาะเจาะจง โดยมอบหมายงานออกแบบให้ subagent `detailed-design-writer`

## ขั้นตอน

1. **สำรวจข้อมูลตั้งต้น** — ดูว่า `docs/02-design/01-prototypes/` มี user journey ที่เกี่ยวข้องแล้วหรือยัง และ `docs/02-design/02-technical/` มี high level architecture / api-spec / database-schema อยู่แล้วหรือไม่ ถ้ายังไม่มี journey เลย ให้แจ้งผู้ใช้และแนะนำให้รัน `/feature-journey` ก่อน ถ้ายังไม่มี architecture/api-db ให้แนะนำ `/architecture` และ `/api-db-design` แต่ยังทำงานต่อได้ถ้าผู้ใช้ต้องการ
2. **หา flow เป้าหมาย** — ถ้าผู้ใช้ระบุ flow ที่ต้องการทำ detailed design มาชัดเจน ให้ใช้ตามนั้น ถ้าไม่ระบุและผู้ใช้ไม่ได้บอกให้ทำต่อเองโดยไม่ต้องถาม ให้ถามสั้น ๆ ว่าต้องการ detailed design ของ flow ไหน
3. **ตรวจว่ามีเอกสาร detailed design ของ flow นี้อยู่แล้วหรือไม่** — ถ้ามีอยู่แล้ว ให้แจ้ง subagent ว่าให้ปรับปรุงไฟล์เดิม ไม่ใช่สร้างใหม่ทับ
4. **มอบหมายงานให้ subagent** — เรียก `detailed-design-writer` ผ่าน Agent tool พร้อม path เอกสารต้นทางที่เกี่ยวข้องทั้งหมดและ flow เป้าหมายจากขั้นตอนที่ 2 สั่งให้เขียน/ปรับปรุงไฟล์ลงดิสก์โดยตรงและอัปเดต `index.md`
5. **นำเสนอผลลัพธ์** — สรุปให้ผู้ใช้ทราบว่าไฟล์ถูกบันทึก/ปรับปรุงที่ไหน และเน้นย้ำหัวข้อ "สมมติฐาน/คำถามที่ต้องยืนยัน" ให้ผู้ใช้ตรวจสอบ
6. **การแก้ไขภายหลัง** — ถ้าผู้ใช้ขอเพิ่ม edge case หรือปรับ sequence ให้เรียก subagent อีกครั้งพร้อมระบุว่าให้ปรับปรุงไฟล์เดิม

## หลักการสำคัญ

- เอกสารต้องเป็น conceptual เท่านั้น ห้ามระบุเทคโนโลยี/ภาษาโปรแกรม/database product เจาะจง
- ต้องมี Sequence Diagram (Mermaid `sequenceDiagram`) เป็นอย่างน้อย ครอบคลุม happy path และ edge case ที่มีหลักฐานรองรับ
- ทุก step สำคัญต้องอ้างอิงกลับไปยัง FR/Feature ID และ journey step ต้นทางเสมอ ห้ามแต่ง error case ที่ไม่มีหลักฐาน
