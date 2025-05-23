import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return new Response(JSON.stringify({ message: "อีเมล์ไม่ถูกต้อง" }), {
      status: 400,
    });
  }

  // --- สร้าง Transporter สำหรับส่งเมล ---
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,       // อีเมลผู้ส่ง
      pass: process.env.ADMIN_EMAIL_PASS,  // รหัสผ่านหรือ App Password
    },
  });

  const mailOptions = {
    from: `"ระบบร้องขอสิทธิ์" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_RECEIVER_EMAIL,  // อีเมลผู้ดูแลระบบ
    subject: "มีคำร้องขอสิทธิ์การใช้งานใหม่",
    text: `มีผู้ร้องขอสิทธิ์ใช้งานด้วยอีเมล: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "ส่งคำร้องขอสำเร็จ" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "เกิดข้อผิดพลาดในการส่งอีเมล" }), {
      status: 500,
    });
  }
}
