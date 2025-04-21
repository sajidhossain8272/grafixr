import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

/**
 * Upload a single File object to Firebase Storage and return its download URL
 *
 * @param file      The File to upload
 * @param folder    (Optional) Folder name in which to store the file
 * @returns         The download URL of the uploaded file
 */
export async function uploadImageToFirebase(file: File, folder = "uploads") {
  if (!file) throw new Error("No file provided for upload.");

  // Create a reference in the desired folder
  const storageRef = ref(storage, `${folder}/${file.name}`);

  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);

  // Get the public download URL
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}
