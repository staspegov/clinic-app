import * as admin from "firebase-admin";

// Initialize Admin SDK once (avoid re-initializing on hot reload / serverless reuse)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// Export Firestore instance as adminDb
const adminDb = admin.firestore();

export { admin, adminDb };
