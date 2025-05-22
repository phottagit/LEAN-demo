"use client";

import { useState } from "react";

export default function RequestAccessForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("กรุณากรอกอีเมล์");
      return;
    }

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("ส่งคำร้องขอสำเร็จ กรุณารอการตอบกลับจากผู้ดูแลระบบ");
        setEmail("");
      } else {
        setMessage(data.message || "เกิดข้อผิดพลาดในการส่งคำร้องขอ");
      }
    } catch (err) {
      setMessage("เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">ขอสิทธิ์ใช้งาน</h2>
      <input
        type="email"
        placeholder="กรอกอีเมล์ของคุณ"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        ส่งคำร้องขอ
      </button>
      {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
}
