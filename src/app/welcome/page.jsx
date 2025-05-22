"use client";

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
    if (session?.user?._id) {
      const userImg = session.user.img;

      if (userImg?.startsWith("data:image/")) {
        // Already full data URI
        setImageUrl(userImg);
      } else if (userImg?.startsWith("user-images/")) {
        // From public folder
        setImageUrl(`/${userImg}`);
      } else if (userImg) {
        // Assume raw base64 from MongoDB, attach MIME prefix
        const mimeType = session.user.imgType || "image/jpeg";
        const dataUri = `data:${mimeType};base64,${userImg}`;
        setImageUrl(dataUri);
      } else {
        setImageUrl(null);
      }

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
        <div className="container mx-auto py-8">
          <div className="flex items-center space-x-4 px-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {!imageError && imageUrl ? (
                <img src={imageUrl} alt="User" onError={handleImageError} />
              ) : (
                <img src="/default-avatar.jpg" alt="Default Avatar" />
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-1xl">ยินดีต้อนรับเข้าสู่ Lean Six Sigma</h3>
              <p className="text-1xl mt-auto">{session?.user?.name}</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="container mx-auto px-4 bg-white">
          <h2 className="text-2xl py-2">โครงการทั้งหมด</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <a href="/sixsigmas/dashboard">
              <div className="flex flex-col items-center">
                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                  <img
                    src="1-Six Sigma.JPG"
                    alt="Six Sigma"
                    className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  />
                </div>
                <h2 className="mt-2 mb-2 text-center font-medium">Lean Six Sigma</h2>
              </div>
            </a>

            <a href="/qccs/qccdashboard">
              <div className="flex flex-col items-center">
                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                  <img
                    src="2-QCC.jpg"
                    alt="QCC"
                    className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  />
                </div>
                <h2 className="mt-2 text-center font-medium">Quality Control Circle</h2>
              </div>
            </a>

            <a href="/suggestions">
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

            <a href="/trainings">
              <div className="flex flex-col items-center">
                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                  <img
                    src="Training_program.jpg"
                    alt="Training"
                    className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  />
                </div>
                <h2 className="mt-2 text-center font-medium">Training</h2>
              </div>
            </a>

            <a href="/activitys">
              <div className="flex flex-col items-center">
                <div className="aspect-square cursor-pointer picture-box rounded-lg w-full">
                  <img
                    src="SMTActivity.jpg"
                    alt="Activity"
                    className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  />
                </div>
                <h2 className="mt-2 text-center font-medium">Activity</h2>
              </div>
            </a>
          </div>
        </div>

        {/* My Apps Section */}
        <div className="container mx-auto px-4 py-4 mb-8 bg-white">
          <h2 className="text-2xl">แอฟของฉัน</h2>
          <div className="mt-4 space-y-2">
            <a
              href="/dashboard"
              target="_blank"
              className="block w-full cursor-pointer buttonbox hover:bg-gray-300 transition p-2 picture-box"
            >
              <h2 className="font-semibold text-left">OBEYA Dashboard</h2>
            </a>
            <a
              href="/six-sigma"
              className="block w-full cursor-pointer buttonbox hover:bg-gray-300 transition p-2 picture-box"
            >
              <h2 className="font-semibold text-left">Lean Suggestion</h2>
            </a>
            <a
              href="/performances"
              target="_blank"
              className="block w-full cursor-pointer buttonbox hover:bg-gray-300 transition p-2 picture-box"
            >
              <h2 className="font-semibold text-left">Performance Design Template</h2>
            </a>
          </div>
        </div>

        <Footer />
      </Container>
    </main>
  );
}
