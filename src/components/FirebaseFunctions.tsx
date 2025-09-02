import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

// Define the shape of the profile data
interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address?: string;
  resume?: string;     
  coverLetter?: string;
}

export async function saveUserProfile(profile: UserProfile) {
  if (!auth.currentUser) {
    throw new Error("User not logged in");
  }

  const userRef = doc(db, "users", auth.currentUser.uid);

  await setDoc(userRef, profile, { merge: true });
}