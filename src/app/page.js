"use client";
import { useState } from "react";
import IdCardDisplay from "@/components/IdCardDisplay";

export default function Home() {
  const [idCardData, setIdCardData] = useState({
    name: "",
    role: "",
    builderTitle: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setIdCardData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-green-800 font-serif p-8">
      <div className="relative w-full border-4 border-white rounded-2xl p-8 min-h-[90vh]">
        <div className="absolute -top-8 left-8 bg-green-800 px-4">
          <div className="text-yellow-400">
            <h1 className="text-4xl font-bold leading-tight">HACKER</h1>
            <div className="relative my-1">
              <span className="text-2xl font-bold bg-pink-500 text-white px-2 py-0.5 rounded-md inline-block">
                गोवा
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">HOUSE</h1>
          </div>
        </div>
        <main className="mt-12 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left Column: Form */}
            <div className="flex flex-col gap-8 text-yellow-400">
              <div className="w-40 h-40 bg-white/10 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                <span className="text-white/40 text-sm">Upload Image</span>
              </div>
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-yellow-300">Name</label>
                  <input type="text" id="name" value={idCardData.name} onChange={handleInputChange} className="w-full p-2.5 rounded-md bg-white/10 border border-white/20 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all" placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="role" className="block mb-1.5 text-sm font-medium text-yellow-300">Stack / Role</label>
                  <input type="text" id="role" value={idCardData.role} onChange={handleInputChange} className="w-full p-2.5 rounded-md bg-white/10 border border-white/20 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all" placeholder="e.g., Full Stack Developer" />
                </div>
                <div>
                  <label htmlFor="builderTitle" className="block mb-1.5 text-sm font-medium text-yellow-300">Builder Title</label>
                  <input type="text" id="builderTitle" value={idCardData.builderTitle} onChange={handleInputChange} className="w-full p-2.5 rounded-md bg-white/10 border border-white/20 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all" placeholder="e.g., The Architect" />
                </div>
                <div className="pt-4">
                  <button className="bg-pink-500 text-white font-bold py-2.5 px-6 rounded-md hover:bg-pink-600 active:scale-95 transition-all w-full md:w-auto">
                    Generate ID Card
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: ID Card Preview */}
            <div className="flex items-center justify-center">
              <IdCardDisplay idCardData={idCardData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
