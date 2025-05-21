"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    empId: "",
    departments: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "user",
    img: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, img: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <Container>
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[#F0EEE4] p-8">
            <div className="flex justify-center items-center">
                <div className="w-[400px] shadow-xl p-10 rounded-xl bg-white">
                <h2 className="text-center text-3xl">ลงทะเบียน</h2>
                <input 
                type="text"  
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" 
                placeholder="ชื่อ-สกุล (name-surname)"
                autoComplete="name"
                />
                <input 
                    type="text"  
                    id="empId"
                    name="empId"
                    value={form.empId}
                    onChange={(e) => setForm({ ...form, empId: e.target.value })} 
                    className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" 
                    placeholder="รหัสพนักงาน (Employee ID)"
                    autoComplete="empId"
                />
                <select 
                id="departments"
                name="departments"
                    onChange={(e) => setForm({ ...form, departments: e.target.value })} 
                    className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" 
                    value={form.departments}
                    autoComplete="off"
                >
                <option value="" disabled>Select department</option>
                <option value="Lean Six Sigma">Lean Six Sigma</option>
                <option value="Production">Production</option>
                <option value="Quality">Quality</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="HR">HR</option>
                </select>
                <input 
                    type="email"  
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                    className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" 
                    placeholder="อีเมล์ (Email)"
                    autoComplete="อีเมล์"
                />
                
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" 
                    placeholder="รหัสผ่าน (Password)"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <input 
                    type="password" 
                    id="confirmpassword"
                    name="confirmpassword"
                    className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" 
                    placeholder="ยืนยันรหัสผ่าน (Confirm Password)"
                    value={form.confirmpassword}
                    onChange={(e) => setForm({ ...form, confirmpassword: e.target.value })}
                />
                <div>
                    <select
                    className="w-full p-2 border rounded"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    ลงทะเบียน
                </button>
                <hr className="my-3" />
                <p className="text-center">
                    Go to{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>{" "}
                    Page
                </p>
                </div>
            </div>   
        </main>
        <Footer />
    </Container>
  );
}