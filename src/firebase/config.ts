import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "pry20231034-upload-files.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `user_images/${v4()}`);
  await uploadBytes(storageRef, file);

  const sourceUrl = await getDownloadURL(storageRef);
  return sourceUrl;
}

