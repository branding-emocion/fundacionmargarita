import { db, storage } from "@/firebase/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const COLLECTION_NAME = "historias";

export const historiasService = {
  // Obtener todas las historias
  async getAll() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("fechaCreacion", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting historias:", error);
      throw error;
    }
  },

  // Obtener una historia por ID
  async getById(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        throw new Error("Historia no encontrada");
      }
    } catch (error) {
      console.error("Error getting historia:", error);
      throw error;
    }
  },

  // Crear nueva historia
  async create(historiaData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...historiaData,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating historia:", error);
      throw error;
    }
  },

  // Actualizar historia
  async update(id, historiaData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...historiaData,
        fechaActualizacion: new Date(),
      });
    } catch (error) {
      console.error("Error updating historia:", error);
      throw error;
    }
  },

  // Eliminar historia
  async delete(id) {
    try {
      const historia = await this.getById(id);

      if (historia.imagen) {
        try {
          await this.deleteImage(historia.imagen);
        } catch (imageError) {
          console.warn(
            "Error deleting image, but continuing with historia deletion:",
            imageError
          );
        }
      }

      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting historia:", error);
      throw error;
    }
  },

  // Subir imagen
  async uploadImage(file, fileName) {
    try {
      const storageRef = ref(storage, `historias/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  // Eliminar imagen
  async deleteImage(imageUrl) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  },
};
