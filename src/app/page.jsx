"use client"

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gray-100">
        <Navbar session={session} />
        <div className="container mx-auto">
          <h2 className="mb-10"></h2>
          <h2 className="text-5xl">What is Lean Six Sigma?</h2>
          <hr className="my-3" />
          <p className="text-2xl mb-4">เครื่องมือทางสถิติ เพื่อลดของเสียและปรับปรุงกระบวนการผลิตอย่างเป็นระบบ</p>
          <p className="text-2xl">การผลิตแบบลีน (Lean Manufacturing)</p>
          <p className="mb-4">การให้หลักการระบุ และกำจัดความสูญเปล่า เพื่อส่งมอบสินค้าที่ลูกค้าต้องการ และทันเวลา เครื่องมือสำหรับการผลิตแบบลีน ด้านความสูญเปล่าการไหล อย่างต่อเนื่อง การดึงดูดจากลูกค้า การตัดสินใจ ตลอดจนการผลิตแบบลีนในอุตสาหกรรมเพื่อเพิ่มศักยภาพในการแข่งขันขององค์กรให้สูงขึ้น  ซึ่งถือว่าความสูญเปล่า ที่เป็นตัวทำให้เวลา ที่ใช้ในการผลิตยาวนานขึ้น และควรมีการนำเทคนิคต่าง ๆ มาใช้ในการกำจัดความสูญเปล่าออกไป (Waste/Muda) ทั้ง 7 ประการ ที่เกิดขึ้นในกระบวนการทำงาน ได้แก่</p>
          <p>1.ของเสียและงานซ่อม (Defect & Rework)</p>
          <p>2.การผลิตงานมากเกินความจำเป็น (Over production)</p>
          <p>3.การรอคอยงาน (Waiting)</p>
          <p>4.การไม่นำความคิดของพนักงานมาใช้ให้เกิดประโยชน์ (Non-Utilized resources)</p>
          <p>5.ขนส่งขนย้ายมากเกินความจำเป็น (Transportation)</p>
          <p>6.สินค้าคงคลังมากเกินไป (Inventory)</p>
          <p>7.การเคลื่อนไหวมากเกินความจำเป็น (Motion)</p>
          <p>8.ขั้นตอนการทำงานมากเกินความจำเป็น (Extra processing)</p>
        </div>
    </main>
  );
}