/**
 * Part C — Seed 5 mealLogs into Firestore
 * วิธีใช้:
 *   1. วางไฟล์ jaifit-ai-coach-firebase-adminsdk-fbsvc-03b3eb97c6.json ไว้ใน folder เดียวกัน
 *   2. npm install firebase-admin
 *   3. node seed_meallogs.js
 */

const admin = require("firebase-admin");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const serviceAccount = require("./jaifit-ai-coach-firebase-adminsdk-fbsvc-03b3eb97c6.json");

admin.initializeApp({
  credential: admin.cert(serviceAccount),
  projectId: "jaifit-ai-coach",
});

const db = getFirestore();

// ─── ข้อมูลตัวอย่าง ──────────────────────────────────────────────────────────

const users = [
  { id: "user_001", name: "สมชาย ใจดี",   email: "somchai@example.com",  currentPhase: "fat-loss",    startDate: "2026-07-14" },
  { id: "user_002", name: "วิภา รักสุข",   email: "wipa@example.com",     currentPhase: "maintenance", startDate: "2026-07-01" },
];

const foodCategories = [
  { id: "cat_rice",   name: "ข้าวและแป้ง",        carbLevel: "high"   },
  { id: "cat_veg",    name: "ผักและสลัด",          carbLevel: "low"    },
  { id: "cat_protein",name: "โปรตีน (เนื้อ/ไข่)",  carbLevel: "low"    },
  { id: "cat_fruit",  name: "ผลไม้",               carbLevel: "medium" },
  { id: "cat_junk",   name: "ของทอด/ขนมขบเคี้ยว", carbLevel: "high"   },
];

const mealLogs = [
  {
    id: "log_001",
    title: "อาหารเช้า — ไข่ต้ม + สลัด",
    description: "ไข่ต้ม 2 ฟอง ผักสลัดรวม น้ำมันมะกอก ไม่มีแป้ง",
    loggedAt: Timestamp.fromDate(new Date("2026-08-25T07:30:00+07:00")),
    status: "safe",
    userId: "user_001",
    userName: "สมชาย ใจดี",
    foodCategoryId: "cat_protein",
    foodCategoryName: "โปรตีน (เนื้อ/ไข่)",
  },
  {
    id: "log_002",
    title: "อาหารกลางวัน — ข้าวผัดหมู",
    description: "ข้าวผัดหมู 1 จาน น้ำมันพืช ไข่ดาว ผัก",
    loggedAt: Timestamp.fromDate(new Date("2026-08-25T12:15:00+07:00")),
    status: "risky",
    userId: "user_001",
    userName: "สมชาย ใจดี",
    foodCategoryId: "cat_rice",
    foodCategoryName: "ข้าวและแป้ง",
  },
  {
    id: "log_003",
    title: "อาหารเย็น — สลัดไก่ย่าง",
    description: "ไก่ย่างอก 150g สลัดผักรวม น้ำสลัดญี่ปุ่น",
    loggedAt: Timestamp.fromDate(new Date("2026-08-25T18:45:00+07:00")),
    status: "safe",
    userId: "user_002",
    userName: "วิภา รักสุข",
    foodCategoryId: "cat_veg",
    foodCategoryName: "ผักและสลัด",
  },
  {
    id: "log_004",
    title: "ของว่าง — มันฝรั่งทอด",
    description: "มันฝรั่งทอดกรอบ 1 ซอง (75g) รสเดิม",
    loggedAt: Timestamp.fromDate(new Date("2026-08-26T15:00:00+07:00")),
    status: "exceeded",
    userId: "user_001",
    userName: "สมชาย ใจดี",
    foodCategoryId: "cat_junk",
    foodCategoryName: "ของทอด/ขนมขบเคี้ยว",
  },
  {
    id: "log_005",
    title: "อาหารเช้า — กล้วยหอม + โยเกิร์ต",
    description: "กล้วยหอม 1 ลูก โยเกิร์ตกรีก plain 150g",
    loggedAt: Timestamp.fromDate(new Date("2026-08-26T08:00:00+07:00")),
    status: "safe",
    userId: "user_002",
    userName: "วิภา รักสุข",
    foodCategoryId: "cat_fruit",
    foodCategoryName: "ผลไม้",
  },
];

// nudges สำหรับ log ที่ status = risky / exceeded
const nudgesByLogId = {
  log_002: {
    message: "ข้าวผัดมีคาร์บสูงนิดนึงนะคะ ลองเปลี่ยนเป็นข้าวกล้องหรือลดปริมาณครึ่งจานดูไหมคะ? 💪",
    sentAt: Timestamp.fromDate(new Date("2026-08-25T12:20:00+07:00")),
    response: "โอเค ครั้งหน้าจะลองข้าวกล้องดูครับ",
  },
  log_004: {
    message: "อุ๊ย! ของทอดเกินโควต้าวันนี้แล้วนะคะ มื้อเย็นลองเลือกอาหารคาร์บต่ำชดเชยดูนะคะ 🥗",
    sentAt: Timestamp.fromDate(new Date("2026-08-26T15:05:00+07:00")),
    response: "",
  },
};

// ─── Seed function ────────────────────────────────────────────────────────────

async function seed() {
  const batch = db.batch();

  // 1) users
  for (const u of users) {
    const ref = db.collection("users").doc(u.id);
    const { id, ...data } = u;
    batch.set(ref, data);
  }

  // 2) foodCategories
  for (const c of foodCategories) {
    const ref = db.collection("foodCategories").doc(c.id);
    const { id, ...data } = c;
    batch.set(ref, data);
  }

  // 3) mealLogs
  for (const log of mealLogs) {
    const ref = db.collection("mealLogs").doc(log.id);
    const { id, ...data } = log;
    batch.set(ref, data);
  }

  await batch.commit();
  console.log("✅ Batch commit: users, foodCategories, mealLogs");

  // 4) nudges (sub-collection — ทำแยกเพราะอยู่ใน sub-collection)
  for (const [logId, nudge] of Object.entries(nudgesByLogId)) {
    const nudgeRef = db
      .collection("mealLogs")
      .doc(logId)
      .collection("nudges")
      .doc(); // auto-id
    await nudgeRef.set(nudge);
    console.log(`  ✅ nudge → mealLogs/${logId}/nudges/${nudgeRef.id}`);
  }

  console.log("\n🎉 Seed เสร็จสมบูรณ์! ตรวจสอบได้ที่ Firebase Console");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed ล้มเหลว:", err);
  process.exit(1);
});
