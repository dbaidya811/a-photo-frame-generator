import Image from 'next/image';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

function IdCardDisplay({ idCardData }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    const { name, role, builderTitle } = idCardData;
    if (name || role || builderTitle) {
      const qrData = JSON.stringify({ name, role, builderTitle });
      QRCode.toDataURL(qrData, { width: 128, margin: 1 })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error(err));
      setRandomId(`ID: ${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      setQrCodeUrl('');
      setRandomId('');
    }
  }, [idCardData]);

  const capitalize = (s) => {
    if (typeof s !== 'string' || !s) return '';
    return s
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="relative w-full max-w-[340px] aspect-[340/540] mx-auto shadow-2xl rounded-2xl bg-white">
      <div
        className="absolute top-0 left-0 w-full h-[60%] rounded-t-2xl overflow-hidden"
        style={{ clipPath: 'ellipse(100% 100% at 50% 0%)' }}
      >
        <img src="/icard.png" alt="ID Card Background" className="w-full h-full object-cover object-top" />
      </div>
      <div className="absolute inset-0 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13.5px]">
        {qrCodeUrl && (
          <div className="absolute top-[1.5em] left-[1.5em] w-[5em] flex flex-col items-center">
            <div className="w-full h-[5em] bg-white p-1 rounded-md shadow-lg text-black flex items-center justify-center">
              <img src={qrCodeUrl} alt="QR Code" className="w-full h-full" />
            </div>
            <span className="text-white font-bold text-[0.8em] mt-1">Scan QR Code</span>
          </div>
        )}
        {randomId && (
          <div className="absolute top-[1.5em] right-[1.5em] text-white font-bold text-[1em]">{randomId}</div>
        )}
        <div className="absolute inset-0 p-4 flex flex-col items-center">
          {/* Profile Photo */}
          <div className="relative w-[10.66em] h-[10.66em] mt-[calc(4.83em+20px)] rounded-full shadow-lg z-10">
            {idCardData?.photoUrl && (
              <img
                src={idCardData.photoUrl}
                alt="User Photo"
                className="w-full h-full rounded-full object-cover object-top border-[0.33em] border-black"
              />
            )}
          </div>
          {/* Curved Separator */}
          {/* <div className="absolute w-[12em] h-[12em] top-[calc(4.16em+37px)] border-[0.33em] border-black rounded-full"></div> */}
          {/* Info Box */}
          <div className="absolute bottom-[75px] left-[10px] right-[10px] text-black flex flex-col items-center gap-y-4">
            <div className="w-full px-4">
              <div className="flex items-end gap-x-2">
                <span className="text-[1.2em] font-bold pb-1">Name:</span>
                <div className="flex-1 border-b-2 border-black text-left">
                  <span className={`font-black tracking-wide ${idCardData.name?.length > 15 ? 'text-[1.3em]' : 'text-[1.66em]'}`}>
                    {capitalize(idCardData.name)}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="flex items-end gap-x-2">
                <span className="text-[1.2em] font-bold pb-1">Role:</span>
                <div className="flex-1 border-b-2 border-black text-left">
                  <span className="text-[1.2em] font-bold">{capitalize(idCardData.role)}</span>
                </div>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="flex items-end gap-x-2">
                <span className="text-[1.2em] font-bold pb-1">Builder Title:</span>
                <div className="flex-1 border-b-2 border-black text-left">
                  <span className="text-[1.2em] font-bold">{capitalize(idCardData.builderTitle)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[0.66em] left-[0.66em] right-[0.66em] bg-yellow-400 text-black p-[0.33em] rounded-lg text-center text-[1em] font-bold">
          #FrameInGoa
        </div>
      </div>
    </div>
  );
}

export default IdCardDisplay;