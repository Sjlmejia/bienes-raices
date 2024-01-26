import firebaseApp  from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
export const UploadFilesTOFirebaseAndReturnUrls = async (files: []) => {
  try {
    const storage = getStorage(firebaseApp);
    //upload files and get responses
    const uploadFilesResponse = await Promise.all(
      files.map((file:any) => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file);
      })
    );

    // use the responses to get the download Urls
    const uploadFilesDownloadUrls = await Promise.all(
      uploadFilesResponse.map((response:any) => {
        return getDownloadURL(response.ref);
      })
    );
    return uploadFilesDownloadUrls;
  } catch (error) {
    console.log(error);
  }
}