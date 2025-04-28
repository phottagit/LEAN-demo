"use client";

import React, { useState } from 'react';
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {
    const [name, setName] = useState("");
    const [empId, setEmpId] = useState("");
    const [departments, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [img, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session } = useSession();
    if (session) redirect('/welcome');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (!name || !departments || !empId || !email || !password || !img) {
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

            // Add loading state
            setError("");
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
                    img: base64Img,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setError("");
                setSuccess("User registered successfully! Redirecting to login...");
                e.target.reset();
                setDepartment("");
                setImage(null);
                
                // Redirect to login after successful registration
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                setSuccess("");
                setError(data.message || "Registration failed.");
                console.error("Registration error:", data);
            }
        } catch (error) {
            setSuccess("");
            console.error("Error during registration:", error);
            setError("Unexpected error occurred. Please try again.");
        }
    };

    return (
        <Container>
            <Navbar />
            <div className="flex-grow">
                <div className="flex justify-center items-center">
                    <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
                        <h3 className="text-3xl">Register Page</h3>
                        <hr className="my-3" />
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                    {success}
                                </div>
                            )}

                            {img && (
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt="Preview"
                                    className="my-2 w-32 h-32 object-cover rounded-full"
                                />
                            )}

                            <input type="text"  onChange={(e) => setName(e.target.value)} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder="ชื่อ"/>
                            <input type="empId" onChange={(e) => setEmpId(e.target.value)} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder="สกุล"/>

                            <select onChange={(e) => setDepartment(e.target.value)} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" value={departments}>
                                <option value="" disabled>Select department</option>
                                <option value="Lean Six Sigma">Lean Six Sigma</option>
                                <option value="Production">Production</option>
                                <option value="Quality">Quality</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Supply Chain">Supply Chain</option>
                                <option value="HR">HR</option>
                            </select>

                            <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder="อีเมล์"/>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder="รหัสผ่าน"/>
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder="ยืนยันรหัสผ่าน"/>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"/>
                            <button type="submit" className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">Sign Up</button>
                        </form>
                        <hr className="my-3" />
                        <p> Go to{" "} <Link href="/login" className="text-blue-500 hover:underline">Login</Link>{" "}Page</p>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default RegisterPage;
