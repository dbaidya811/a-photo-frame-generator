import Image from 'next/image';

function IdCardDisplay({ idCardData }) {
  const capitalize = (s) => {
    if (typeof s !== 'string' || !s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="relative w-full max-w-[340px] aspect-[340/540] mx-auto shadow-2xl rounded-2xl">
      <div className="absolute inset-0">
        <Image
        src="/icard.png"
        alt="ID Card"
        loading="eager"
        sizes="(max-width: 340px) 100vw, 340px"
        fill
        className="rounded-2xl object-cover"
      />
      </div>
      <div className="absolute inset-0 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13.5px]">
        <div className="absolute inset-0 p-4 flex flex-col items-center">
          <div className="relative w-[10.66em] h-[10.66em] mt-[4.83em] border-[0.33em] border-transparent rounded-full shadow-lg">
            {idCardData?.photoUrl && (
              <Image
                src={idCardData.photoUrl}
                alt="User Photo"
                fill
                sizes="128px"
                priority
                className="rounded-full object-cover border-[0.33em] border-white"
              />
            )}
          </div>
        </div>
        {/* Name Text */}
        <div
          className={`absolute top-[calc(42.5%-9px)] left-[calc(38%-5px)] text-gray-900 font-bold tracking-wide ${
            idCardData.name && idCardData.name.length > 20 ? 'text-[1.5em]' : 'text-[1.66em]'
          }`}
        >
          {capitalize(idCardData.name)}
        </div>
        {/* Stack / Role Text */}
        <div
          className={`absolute top-[calc(48.5%-17px)] left-[calc(48%+2px)] text-gray-900 font-bold tracking-wide ${
            idCardData.role && idCardData.role.length > 16 ? 'text-[1.5em]' : 'text-[1.66em]'
          }`}
        >
          {idCardData.role}
        </div>
        {/* Generated Title Text */}
        <div
          className={`absolute top-[calc(54%-24px)] left-[58%] text-black font-bold tracking-wide ${
            idCardData.builderTitle && idCardData.builderTitle.length > 12
              ? 'text-[1.5em]'
              : 'text-[1.66em]'
          }`}
        >
          {idCardData.builderTitle}
        </div>
        <div className="absolute bottom-[0.66em] left-[0.66em] right-[0.66em] bg-black text-white p-[0.33em] rounded-lg text-center text-[1em]">
          #FrameInGoa
        </div>
      </div>
    </div>
  );
}

export default IdCardDisplay;