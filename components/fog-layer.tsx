"use client";

export default function FogLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          opacity-[0.4]
          blur-[30px]
        "
        style={{
          mixBlendMode: "screen",
          transform: "scale(1.05)",
        }}
      >
        <source src="/videos/fog.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
