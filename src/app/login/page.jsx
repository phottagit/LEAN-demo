"use client";

import React, { useState, useEffect } from 'react';
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { data: session, status } = useSession();

    // Redirect if user is already logged in
    useEffect(() => {
        if (status === "authenticated") {
            router.replace("welcome");
        }
    }, [status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid credentials or server error");
                console.error("Login error:", res.error);
                return;
            }

            router.replace("welcome");
        } catch (error) {
            console.error("Login exception:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Navbar />
            <div className="flex-grow">
                <div className="flex justify-center items-center">
                    <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
                        <h3 className="text-3xl">เข้าสู่ระบบ</h3>
                        <hr className="my-3" />
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                                placeholder="Enter your email"
                                disabled={isLoading}
                                autoComplete="email"
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                                placeholder="Enter your password"
                                disabled={isLoading}
                                autoComplete="current-password"
                            />
                            <button 
                                type="submit" 
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
}

export default LoginPage;
