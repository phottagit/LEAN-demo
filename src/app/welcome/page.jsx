"use client"

import Image from "next/image";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
    const { data: session } = useSession();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageError, setImageError] = useState(false);

    if (!session) redirect("/login");
    
    useEffect(() => {
        if (session?.user?.img) {
            setImageUrl(`/api/userimage/${session.user.img}`);
            setImageError(false);
        }
    }, [session]);

    const handleImageError = () => {
        console.error("Failed to load image:", imageUrl);
        setImageError(true);
    };

    return (
        <main>
            <Container>
                <Navbar session={session} />
                <div className="flex-wrap text-center p-10">
                    {imageUrl && !imageError ? (
                        <div className="flex justify-center mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <img 
                                    src={imageUrl} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500 text-2xl">{session?.user?.name?.charAt(0) || "U"}</span>
                            </div>
                        </div>
                    )}

                    <h3 className="text-5xl"> ยินดีต้อนรับ: {session?.user?.name}</h3>
                    <p className="text-2xl mt-3">{session?.user?.email}</p>
                </div>
                <div className="container mx-auto px-4 py-8 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <a href="/sixsigmas">
                            <div className="flex flex-col items-center">
                                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                                    <img src="1-Six Sigma.JPG" alt="Six Sigma" className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow" />
                                </div>   
                                    <h2 className="mt-2 text-center font-medium">Lean Six Sigma</h2>
                            </div>
                        </a>

                        <a href="/qcc">
                            <div className="flex flex-col items-center">
                                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                                <img src="2-QCC.jpg" alt="QCC" className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"/>
                                </div>
                                <h2 className="mt-2 text-center font-medium">Quality Control Circle</h2>
                            </div>
                        </a>

                        <a href="/ihaveanideas">
                            <div className="flex flex-col items-center">
                                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                                    <img 
                                        src="/ihaveanIdeas.jpg" 
                                        alt="Ideas" 
                                        className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                                    />
                                </div>   
                                    <h2 className="mt-2 text-center font-medium">Lean Suggestion</h2>
                                </div>
                        </a>

                        <a href="/training">
                            <div className="flex flex-col items-center">
                                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                                    <img src="Training_program.jpg" alt="Training" className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow" />
                                </div>    
                                    <h2 className="mt-2 text-center font-medium">Training</h2>
                            </div>   
                        </a>

                        <a href="/activity">
                            <div className="flex flex-col items-center">
                                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                                    <img src="SMTActivity.jpg" alt="Activity" className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow" />
                                </div>
                                <h2 className="mt-2 text-center font-medium">Activity</h2>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="container bg-gray">
                  <h2 className="mb-4"></h2>    
                </div>  

                <div className="container mx-auto px-4 py-8 bg-white">
                <h2 className="text-2xl">แอฟของฉัน</h2>
                <h2 className="mb-4"></h2>

                  <a href="/dachboard" target="_blank" className="block w-100 cursor-pointer buttonbox hover:bg-gray-300 transition p-3 picture-box">
                    <div>
                      <h2 className="font-semibold text-left">OBEYA Dashboard</h2>
                    </div>
                  </a>
                <h2 className="mb-2"></h2>
                  <a href="/six-sigma" className="block w-100 cursor-pointer buttonbox hover:bg-gray-300 transition p-3 picture-box">
                    <div>
                      <h2 className="font-semibold text-left">Lean Suggestion</h2>
                    </div>
                  </a>

                </div>     
                <Footer />
            </Container>
        </main>
    );
}
