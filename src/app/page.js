"use client";
import { useState, useEffect, useRef } from "react";
import { toPng } from 'html-to-image';
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
  const cardPreviewRef = useRef(null);
  const idCardRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

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
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardData((prev) => ({
          ...prev,
          photoUrl: reader.result,
          photoName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setDisplayCardData(idCardData);
    setShowCard(true);
    setTimeout(() => {
      cardPreviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    setNotification({ show: true, message: 'ID Card Generated Successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleCancel = () => {
    setShowCard(false);
  };

  const handleDownload = () => {
    if (idCardRef.current === null) {
      return;
    }
    setIsDownloading(true);
    setNotification({ show: true, message: 'Download starting...', type: 'info' });

    toPng(idCardRef.current, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${displayCardData.name.toLowerCase().replace(/\s/g, '-') || 'hackerhouse'}-id-card.png`;
        link.href = dataUrl;
        link.click();
        setIsDownloading(false);
        setNotification({ show: true, message: 'Download successful!', type: 'success' });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
      })
      .catch((err) => {
        console.error('Failed to download image', err);
        setIsDownloading(false);
        setNotification({ show: true, message: 'Download failed. Please try again.', type: 'error' });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
      });
  };

  const handleShare = async () => {
    if (idCardRef.current === null) {
      return;
    }
    setIsSharing(true);
    const text = "Just got my official builder card for HH Goa 2026! 🌴🚀 Super excited to meet the amazing community, write some killer code, and vibe by the beach. Who else is going to be there? Let's connect and build something awesome together! 🌊💻 #FrameInGoa";

    try {
      const dataUrl = await toPng(idCardRef.current, { cacheBust: true, pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const fileName = `${displayCardData.name.toLowerCase().replace(/\s/g, '-') || 'hackerhouse'}-id-card.png`;
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Hacker House Goa ID Card',
          text: text,
        });
      } else {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(twitterUrl, '_blank');
        alert('To share the image, please download it first and then attach it to your post on X.');
      }
    } catch (err) {
      console.error('Failed to share image', err);
      alert('Could not prepare the image for sharing. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center bg-green-800 font-serif p-4 md:p-8 min-h-screen">
      {notification.show && (
        <div
          className={`fixed top-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-out ${
            notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {notification.message}
        </div>
      )}
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
        <main className="mt-28 md:mt-12 w-full flex justify-center">
          <div className="grid md:grid-cols-2 gap-16 items-start w-full">
            {/* Form Column */}
            <div className="flex flex-col items-center gap-8 text-yellow-400">
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
            <div ref={cardPreviewRef} className={`relative flex-col items-center justify-start ${!showCard ? 'hidden md:flex' : 'flex'}`}>
              {showCard && <Confetti />}
              <div className="w-full" ref={idCardRef}>
                <IdCardDisplay idCardData={displayCardData} />
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button onClick={handleDownload} disabled={!showCard || isDownloading} className="flex items-center justify-center gap-2">
                  <DownloadIcon />
                  {isDownloading ? 'Downloading...' : 'Download'}
                </button>
                <button onClick={handleShare} disabled={!showCard || isSharing} className="flex items-center justify-center gap-2">
                  <TwitterIcon />
                  {isSharing ? 'Sharing...' : 'Share on X'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
