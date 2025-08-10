// firebase/firebase.ts (or src/lib/firebase.ts)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// --- Config ---
const firebaseConfig = {
  apiKey: "AIzaSyBc6eo2ZbzlC-3TSjivEkYRFIbSAyLv7i4",
  authDomain: "cimerchile.firebaseapp.com",
  projectId: "cimerchile",
  storageBucket: "cimerchile.firebasestorage.app",
  messagingSenderId: "648750161267",
  appId: "1:648750161267:web:a074f85e7c9547010bb906",
  measurementId: "G-D760ZW4CTK",
};

// --- App (singleton, safe for HMR) ---
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// --- Firestore ---
const db = getFirestore(app);

// --- Analytics (browser-only, optional) ---
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  // Guard for SSR
  isSupported()
    .then((supported) => {
      if (supported) {
        // getAnalytics must run in browser context
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // ignore analytics init errors silently
    });
}

// Optional helper if you want to read it later without importing types everywhere
export const getAnalyticsInstance = () => analytics;

export { app, db, analytics };
