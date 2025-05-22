"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [departments, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [img, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if user is already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/register");
    }
  }, [status, router]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !empId || !departments || !email || !password || !img) {
      setError("Please complete all inputs.");
      return;
    }

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    try {
      const base64Img = await toBase64(img);

      setSuccess("Processing registration...");

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          empId,
          departments,
          email,
          password,
          role,
          img: base64Img,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("User registered successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Unexpected error occurred. Please try again.");
    }
  };

  if (status === "loading") return null; // wait for session to load

  return (
    <Container>
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-[#F0EEE4] p-8">
        <div className="flex justify-center items-center">
          <div className="w-[400px] shadow-xl p-10 rounded-xl bg-white">
            <h2 className="text-center text-3xl">ลงทะเบียน</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded my-2">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded my-2">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="ชื่อ-สกุล (Name)"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="รหัสพนักงาน (Employee ID)"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
              <select
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={departments}
                onChange={(e) => setDepartment(e.target.value)}
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
                placeholder="อีเมล์ (Email)"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="รหัสผ่าน (Password)"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="ยืนยันรหัสผ่าน (Confirm Password)"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <select
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2">
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                ลงทะเบียน
              </button>
            </form>
            <hr className="my-3" />
            <p className="text-center">
              Go to{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Home
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
