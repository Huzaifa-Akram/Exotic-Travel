"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manageMode, setManageMode] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const saveConsent = (preferences: string) => {
    localStorage.setItem("cookieConsent", preferences);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none flex flex-col items-center justify-end">
      <div className="bg-elevated pointer-events-auto border border-white/10 w-full max-w-4xl p-6 sm:p-8 rounded-sm shadow-2xl flex flex-col md:flex-row gap-8 items-start md:items-center">
        {!manageMode ? (
          <>
            <div className="flex-1">
              <h3 className="font-display text-xl text-white font-light">Your privacy</h3>
              <p className="text-muted mt-2 text-sm text-pretty">
                We use cookies to improve your experience on our site, analyse our traffic, and for marketing purposes. You can accept all, reject non-essential cookies, or manage your preferences. Read our <Link href="/legal/privacy" className="text-gold hover:underline">Privacy Policy</Link> for more information.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => setManageMode(true)}
                className="btn border border-white/20 text-white hover:bg-white/5 py-2.5 px-5"
              >
                Manage
              </button>
              <button
                onClick={() => saveConsent("essential")}
                className="btn border border-white/20 text-white hover:bg-white/5 py-2.5 px-5"
              >
                Reject
              </button>
              <button
                onClick={() => saveConsent("all")}
                className="btn btn-primary py-2.5 px-6"
              >
                Accept All
              </button>
            </div>
          </>
        ) : (
          <div className="w-full">
            <h3 className="font-display text-xl text-white font-light mb-6">Manage Cookie Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <input type="checkbox" checked disabled className="accent-gold mt-1 h-4 w-4 shrink-0 cursor-not-allowed opacity-50" />
                <div>
                  <p className="text-white text-sm font-medium">Essential Cookies</p>
                  <p className="text-muted text-xs mt-1">Required for the website to function properly and securely. These cannot be disabled.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <input 
                  type="checkbox" 
                  checked={analytics} 
                  onChange={(e) => setAnalytics(e.target.checked)} 
                  className="accent-gold mt-1 h-4 w-4 shrink-0 cursor-pointer" 
                  id="cookie-analytics"
                />
                <label htmlFor="cookie-analytics" className="cursor-pointer">
                  <p className="text-white text-sm font-medium">Analytics Cookies</p>
                  <p className="text-muted text-xs mt-1">Help us understand how visitors interact with the website by collecting and reporting information anonymously.</p>
                </label>
              </div>

              <div className="flex items-start gap-4">
                <input 
                  type="checkbox" 
                  checked={marketing} 
                  onChange={(e) => setMarketing(e.target.checked)} 
                  className="accent-gold mt-1 h-4 w-4 shrink-0 cursor-pointer" 
                  id="cookie-marketing"
                />
                <label htmlFor="cookie-marketing" className="cursor-pointer">
                  <p className="text-white text-sm font-medium">Marketing Cookies</p>
                  <p className="text-muted text-xs mt-1">Used to track visitors across websites to allow publishers to display relevant and engaging advertisements.</p>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => setManageMode(false)}
                className="btn border border-white/20 text-white hover:bg-white/5 py-2.5 px-5"
              >
                Back
              </button>
              <button
                onClick={() => saveConsent(JSON.stringify({ essential: true, analytics, marketing }))}
                className="btn btn-primary py-2.5 px-6"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
