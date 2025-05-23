export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-600 text-xl p-10">
      <h2 className="text-center font-medium ">❌ คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (Unauthorized)</h2>
      <h3 className="text-center font-medium ">กรุณาติดต่อผู้ดูแลระบบ</h3>
    </div>
  );
}