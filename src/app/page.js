"use client";
import { useState, useEffect } from "react";
import IdCardDisplay from "@/components/IdCardDisplay";
 
import DownloadIcon from "@/components/icons/DownloadIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
export default function Home() {
  const [idCardData, setIdCardData] = useState({
    name: "",
    role: "",
    builderTitle: "",
    photoUrl: null,
  });
  const [displayCardData, setDisplayCardData] = useState({
    name: "",
    role: "",
    builderTitle: "",
    photoUrl: null,
  });
  const [showCard, setShowCard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setIdCardData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (idCardData.photoUrl) {
        URL.revokeObjectURL(idCardData.photoUrl);
      }
      const file = e.target.files[0];
      setIdCardData((prev) => ({ ...prev, photoUrl: URL.createObjectURL(file) }));
    }
  };

  const handleGenerate = () => {
    setDisplayCardData(idCardData);
    setShowCard(true);
  };

  const handleCancel = () => {
    setShowCard(false);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-green-800 font-serif p-4 md:p-8 min-h-screen">
      <div className="relative w-full border-4 border-white rounded-2xl p-4 md:p-8">
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
        <main className="mt-4 md:mt-12 w-full flex justify-center">
          <div className="grid md:grid-cols-2 gap-16 items-start w-full">
            {/* Form Column */}
            <div className={`flex-col items-center gap-8 text-yellow-400 ${isMobile && showCard ? 'hidden' : 'flex'}`}>
              <div className="flex flex-col items-center gap-8 text-yellow-400 w-full">
                <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleImageChange} />
                <label htmlFor="imageUpload" className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center border-2 border-dashed border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                  {idCardData.photoUrl ? <img src={idCardData.photoUrl} alt="Preview" className="w-full h-full object-cover rounded-full" /> : (
                    <span className="text-white/40 text-sm">Upload Image</span>
                  )}
                </label>
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
                    <button onClick={handleGenerate} className="bg-pink-500 text-white font-bold py-2.5 px-6 rounded-md hover:bg-pink-600 active:scale-95 transition-all w-full md:w-auto">
                      Generate ID Card
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ID Card Preview Column */}
            <div className={`flex-col items-center justify-start ${isMobile && !showCard ? 'hidden' : 'flex'}`}>
              <div className="w-full relative">
                <IdCardDisplay idCardData={displayCardData} />
                {showCard && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                    <div className="flex flex-col gap-4">
                      <button onClick={() => {}} className="flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                        <DownloadIcon />
                        Download
                      </button>
                      <button onClick={() => {}} className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                        <TwitterIcon />
                        Share on X
                      </button>
                    </div>
                  </div>
                )}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
