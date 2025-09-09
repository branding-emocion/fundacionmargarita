import { storage, db } from "@/firebase/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const uploadImage = async (file, folder = "images") => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      path: snapshot.ref.fullPath,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteImage = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const createNoticia = async (noticiaData) => {
  try {
    const docRef = await addDoc(collection(db, "noticias"), {
      ...noticiaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating noticia:", error);
    throw error;
  }
};

export const getNoticias = async () => {
  try {
    const q = query(collection(db, "noticias"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  } catch (error) {
    console.error("Error getting noticias:", error);
    throw error;
  }
};

export const getNoticia = async (id) => {
  try {
    const docRef = doc(db, "noticias", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting noticia:", error);
    throw error;
  }
};

export const updateNoticia = async (id, noticiaData) => {
  try {
    const docRef = doc(db, "noticias", id);
    await updateDoc(docRef, {
      ...noticiaData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating noticia:", error);
    throw error;
  }
};

export const deleteNoticia = async (id) => {
  try {
    const docRef = doc(db, "noticias", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting noticia:", error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      ...blogData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  } catch (error) {
    console.error("Error getting blogs:", error);
    throw error;
  }
};

export const getBlog = async (id) => {
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting blog:", error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const docRef = doc(db, "blogs", id);
    await updateDoc(docRef, {
      ...blogData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const docRef = doc(db, "blogs", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const getNoticiaById = getNoticia;
export const getBlogById = getBlog;
