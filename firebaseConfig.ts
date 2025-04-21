// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Replace these with your actual Firebase project config values
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXX-XXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg12345",
};

// Initialize the Firebase app once
const app = initializeApp(firebaseConfig);

// Export the storage reference
export const storage = getStorage(app);
