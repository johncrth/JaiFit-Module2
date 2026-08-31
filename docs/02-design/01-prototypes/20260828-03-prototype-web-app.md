# Prototype — Web App (Signup, Onboarding, Dashboard, Proactive Nudge)

- **วันที่จัดทำ:** 2026-08-28 (รอบ 3 — Pivot ช่องทางจาก LINE OA เป็น Web App)
- **แทนที่:** [[../../00-archived/20260827-02-prototype-proactive-nudge-chat-LINE|Prototype — หน้าจอแชท Proactive Nudge (LINE) [ARCHIVED]]] — เนื้อหา/flow เดิมยังคงไว้ทั้งหมด เปลี่ยนแค่หน้าตาให้เป็น Web App

Mockup หน้าตา Web App 4 หน้าจอ ครอบคลุม flow หลักของ JaiFit ตาม [[20260827-01-user-journey-proactive-nudge|User Journey — Proactive Nudge ก่อนเวลาเสี่ยง]] (step S, AM, A0, E) และ [[../../01-requirements/01-spec/20260827-01-jaifit-ai-coach-metabolic-transition|Requirement Spec]]:

1. **หน้าสมัครสมาชิก/เข้าสู่ระบบ (Signup/Login)** — journey step S: user กรอกอีเมล + รหัสผ่านเพื่อสร้างบัญชี (FR11)
2. **หน้า Onboarding wizard** — journey step AM + A0: รวม 3 ขั้นตอนไว้ในหน้าเดียวกัน (progress dots ด้านบน) — เก็บแรงจูงใจ (FR10), เลือกโหมดความเข้มข้น (FR6), และขอสิทธิ์ Web Push Notification (FR11)
3. **หน้าแชทหลัก (Dashboard/Chat)** — journey step A-J: user คุยกับ AI บันทึกพฤติกรรมการกิน พร้อมตัวอย่าง Web Push Notification ที่ลอยขึ้นมุมขวาบน จำลอง nudge ที่ระบบส่งจริง (FR2, FR7, FR8, FR10)
4. **หน้าประวัติ/สรุปความคืบหน้า (History/Dashboard)** — journey step J, M/N: แสดง phase ปัจจุบัน, weekly compliance, streak และสถานะ reward, trend พฤติกรรมเสี่ยง (FR3, FR5, FR9)

**เปิด mockup:** [20260828-03-prototype-web-app.html](./20260828-03-prototype-web-app.html)

> ไฟล์ HTML เป็น self-contained mockup (inline CSS ทั้งหมด ไม่พึ่ง CDN) เปิดด้วยเบราว์เซอร์ได้โดยตรง ไม่มี JavaScript ที่ทำงานจริง เป็นแค่หน้าตา (visual) ไม่ใช่ของใช้งานได้จริง — กรอบ browser chrome (ปุ่มแดง/เหลือง/เขียว + address bar) เป็น visual cue เพื่อสื่อว่านี่คือ Web App ไม่ใช่ mobile app native

## องค์ประกอบในหน้าจอ mapping กลับไปยัง Requirement/Feature

### หน้าจอ 1 — Signup/Login

| องค์ประกอบในหน้าจอ | สิ่งที่สื่อถึง | อ้างอิง |
|---|---|---|
| ฟอร์มกรอกอีเมล + รหัสผ่าน พร้อมปุ่ม "สมัครสมาชิก" | User สร้างบัญชีใหม่บน Web App แทนการอิง LINE user ID เดิม | FR11 (F35), journey step S |
| ลิงก์ "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ" | จำลองทางแยกไปหน้า login สำหรับ user เดิม | FR11 (F36), journey step S |

### หน้าจอ 2 — Onboarding Wizard

| องค์ประกอบในหน้าจอ | สิ่งที่สื่อถึง | อ้างอิง |
|---|---|---|
| Progress dots ด้านบน (3 ขั้นตอน) | สื่อว่า onboarding เป็น wizard หลายขั้นตอนต่อเนื่องกัน (signup → motivation → mode) | journey step S→AM→A0 |
| คำถาม "อะไรคือเหตุผลที่ทำให้คุณอยากลดน้ำหนัก..." + คำตอบใน textarea | จำลองการเก็บแรงจูงใจผ่านข้อความอิสระ (ไม่ใช่ตัวเลือกตายตัว) | FR10 (F30), journey step AM |
| ข้อความ AI สะท้อนกลับ "เป้าหมายของคุณคือการได้อยู่กับลูกไปนานๆ" | สื่อว่าระบบจัดกลุ่ม/บันทึกแรงจูงใจสำเร็จ พร้อม referenced_target | FR10 (F31, F33) |
| การ์ดเลือกโหมด "หักดิบ" / "ค่อยเป็นค่อยไป" | ให้ user เลือกโหมดความเข้มข้นตอน onboarding | FR6 (F18), journey step A0 |
| ปุ่ม "อนุญาตการแจ้งเตือน (Web Push) และเริ่มใช้งาน" | จำลองการขอสิทธิ์ Web Push Notification ปิดท้าย onboarding | FR11 (F37) |

### หน้าจอ 3 — แชทหลัก + Push Notification

| องค์ประกอบในหน้าจอ | สิ่งที่สื่อถึง | อ้างอิง |
|---|---|---|
| แถบ user chip "Day 2 · Onset · โหมดหักดิบ" บน topbar | แสดง phase + intensity mode ปัจจุบันของ user | FR3 (F10), FR6 (F19) |
| กล่อง push notification ลอยมุมขวาบน ("อีกสักครู่จะถึงบ่าย 2 โมง...") | จำลองรูปแบบ Web Push Notification จริงที่ browser จะแสดง พร้อมปุ่ม quick action | FR2 (F5, F6), journey step E |
| แถบเตือนสีเหลือง "📌 ล่วงหน้าไว้เลยนะคะ: ช่วงนี้อาจมีมือสั่น มึนหัวได้..." | การเตือนล่วงหน้าอาการไม่พึงประสงค์พร้อมวิธีรับมือ แสดงในหน้าแชทโดยตรง (ไม่ใช่แค่ notification) | FR8 (F24, F25) |
| ข้อความแชท "เยี่ยมมากค่ะ! ผ่านช่วงเวลาเสี่ยง...เพื่อเป้าหมายที่อยากอยู่กับลูกไปนานๆ" | โยงข้อความให้กำลังใจกลับไปหาแรงจูงใจเดิมของ user | FR10 (F33) |
| Sidebar nav (แชท/ประวัติ/รางวัล/ตั้งค่า) | โครงสร้าง navigation ของ Web App ที่แทนที่การไล่ scroll แชทอย่างเดียวแบบ LINE | — (การตัดสินใจ UI ใหม่จาก pivot) |

### หน้าจอ 4 — ประวัติ/Dashboard

| องค์ประกอบในหน้าจอ | สิ่งที่สื่อถึง | อ้างอิง |
|---|---|---|
| stat card "8 วัน อยู่ใน phase ปัจจุบัน" และ "86% ทำตามคำแนะนำ" | สรุป phase + weekly compliance | FR5 (F15, F16) |
| แถบ streak bar "🔥 Streak ปัจจุบัน — 8 วันต่อเนื่อง" | แสดงความคืบหน้า streak เทียบกับ milestone 30 วัน | FR9 (F26) |
| รายการรางวัล "Cheat meal (ปลดล็อกแล้ว)" / "Cheat day (อีก 22 วัน)" | สถานะการปลดล็อกรางวัลตาม milestone 7/30 วัน | FR9 (F27, F28) |
| รายการ "แนวโน้มพฤติกรรมเสี่ยง" รายวัน | trend พฤติกรรมเสี่ยงที่ลดลง/เพิ่มขึ้น | FR5 (F17) |

## สมมติฐาน/คำถามที่ต้องยืนยัน

- Mockup นี้รวม onboarding step AM (motivation) และ A0 (mode) ไว้เป็น wizard เดียวกัน ไม่ได้แยกหน้าแยกกันทีละ step แบบ full-screen เหมือน mockup LINE เดิม — เป็นการตัดสินใจ UI ใหม่ที่เหมาะกับ web form มากกว่า ยังไม่ได้ validate กับ user จริง
- กล่อง push notification ในหน้าจอ 3 เป็นภาพจำลอง (ไม่ใช่ browser notification จริง) เพื่อสื่อสารตำแหน่ง/เนื้อหา ตำแหน่ง/ดีไซน์จริงจะขึ้นกับ browser ของแต่ละ user (Chrome/Firefox/Safari แสดงไม่เหมือนกัน) และ JaiFit ควบคุมได้แค่เนื้อหา ไม่ใช่ layout ของ notification เอง
- ยังไม่มี mockup สำหรับ flow login (แสดงเฉพาะ signup), ลืมรหัสผ่าน, หรือกรณี Web Push permission ถูกปฏิเสธ (fallback ไป Email) — ควรทำเพิ่มเมื่อ flow เหล่านี้ถูกออกแบบละเอียดขึ้น
- สีธีม (เขียว JaiFit), sidebar layout, และ browser-chrome frame เป็น default ที่เลือกเองเพื่อสื่อว่าเป็น Web App ยังไม่ใช่ design system ที่ยืนยันแล้วของโปรเจกต์ — เปลี่ยนจากธีมเขียว LINE เดิมเป็นเขียวแบรนด์ JaiFit เอง เพราะไม่ผูกกับ LINE อีกต่อไป
- ถ้อยคำ/สคริปต์ข้อความทั้งหมดเป็นตัวอย่างที่แต่งขึ้นเพื่อสื่อสารหน้าตาเท่านั้น เช่นเดียวกับ mockup เวอร์ชันก่อนหน้า ต้องให้ copywriter/ทีมคอนเทนต์ทบทวนก่อนใช้งานจริง
