"use client";

import { useState, useEffect } from "react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  // Only render on client to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#362a22] text-[#e2d1bf] rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#4a3f35] transition-all duration-300 hover:-translate-y-1 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      aria-label="Share this post"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-in zoom-in duration-300">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-in zoom-in duration-300">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      )}
      
      <span className="absolute -top-12 bg-[#362a22] text-[#e2d1bf] text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md">
        {copied ? "Link Copied!" : "Share Post"}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#362a22] rotate-45"></span>
      </span>
    </button>
  );
}
