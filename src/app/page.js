"use client";
import { useState, useEffect } from "react";
import IdCardDisplay from "@/components/IdCardDisplay";

import "./inputs.css";
import "./buttons.css";
import DownloadIcon from "@/components/icons/DownloadIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import CameraIcon from "./CameraIcon";
import Confetti from "@/components/Confetti";
import "@/components/confetti.css";
export default function Home() {
  const [idCardData, setIdCardData] = useState({
    name: "",
    role: "",
    builderTitle: "",
    photoUrl: null,
    photoName: "",
  });
  const [displayCardData, setDisplayCardData] = useState({
    name: "",
    role: "",
    builderTitle: "",
    photoUrl: null,
    photoName: "",
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
    const maxLengths = {
      name: 20,
      role: 25,
      builderTitle: 25,
    };

    let processedValue = value;
    if (id === 'name') {
      processedValue = processedValue.replace(/[0-9]/g, '');
    }

    const maxLength = maxLengths[id];
    setIdCardData((prev) => ({ ...prev, [id]: maxLength ? processedValue.slice(0, maxLength) : processedValue }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (idCardData.photoUrl) {
        URL.revokeObjectURL(idCardData.photoUrl);
      }
      const file = e.target.files[0];
      setIdCardData((prev) => ({
        ...prev,
        photoUrl: URL.createObjectURL(file),
        photoName: file.name,
      }));
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
    <div className="flex flex-col flex-1 items-center bg-green-800 font-serif p-4 md:p-8 min-h-screen">
      <div className="relative w-full border-4 border-white rounded-2xl p-4 md:p-8">
        <div className="absolute -top-8 left-8 bg-green-800 px-4 py-2">
          <div className="flex items-center gap-4">
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
        </div> 
        <main className="mt-4 md:mt-12 w-full flex justify-center">
          <div className="grid md:grid-cols-2 gap-16 items-start w-full">
            {/* Form Column */}
            <div className={`flex-col items-center gap-8 text-yellow-400 ${isMobile && showCard ? 'hidden' : 'flex'}`}>
              <div className="w-full max-w-md space-y-12">
                  <div className="input__container profile-photo-container mx-auto" style={{'--label-content': "'Profile Photo'"}}>
                    <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleImageChange} />
                    <label htmlFor="imageUpload" className="profile-photo-label cursor-pointer">
                      {idCardData.photoUrl ? (
                        <img src={idCardData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (<CameraIcon className="w-16 h-16 text-black" />)}
                      </label>
                    <div className="shadow__input"></div>
                  </div>
                  <div className="input__container mx-auto" style={{'--label-content': "'Name (20 Chars)'"}}>
                    <input type="text" id="name" value={idCardData.name} onChange={handleInputChange} className="input__search" placeholder="Enter your name" maxLength="20" />
                    <div className="shadow__input"></div>
                  </div>

                  <div className="input__container mx-auto" style={{'--label-content': "'Stack / Role (25 Chars)'"}}>
                    <input type="text" id="role" value={idCardData.role} onChange={handleInputChange} className="input__search" placeholder="e.g., Full Stack Developer" maxLength="25" />
                    <div className="shadow__input"></div>
                  </div>

                  <div className="input__container mx-auto" style={{'--label-content': "'Builder Title (25 Chars)'"}}>
                    <input type="text" id="builderTitle" value={idCardData.builderTitle} onChange={handleInputChange} className="input__search" placeholder="e.g., The Architect" maxLength="25" />
                    <div className="shadow__input"></div>
                  </div>

                  <div className="pt-4">
                    <button onClick={handleGenerate} className="w-full md:w-auto">
                      Generate ID Card
                    </button>
                  </div>
              </div>
            </div>

            {/* ID Card Preview Column */}
            <div className={`relative flex-col items-center justify-start ${isMobile && !showCard ? 'hidden' : 'flex'}`}>
              <div className="w-full">
                {showCard && <Confetti />}
                <IdCardDisplay idCardData={displayCardData} showCard={showCard} />
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button onClick={() => {}} disabled={!showCard} className="flex items-center justify-center gap-2">
                  <DownloadIcon />
                  Download
                </button>
                <button onClick={() => {}} disabled={!showCard} className="flex items-center justify-center gap-2">
                  <TwitterIcon />
                  Share on X
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
