"use client";

import { create } from "zustand";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";

export const useAllianceStore = create()((set, get) => ({
  alliances: [],
  loading: false,
  error: null,

  fetchAlliances: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "alliances"));
      const alliances = [];
      querySnapshot.forEach((doc) => {
        alliances.push({ id: doc.id, ...doc.data() });
      });
      set({ alliances, loading: false });
    } catch (error) {
      console.error("Error fetching alliances:", error);
      set({ error: error.message, loading: false });
    }
  },

  uploadImage: async (file) => {
    try {
      const imageRef = ref(storage, `alliances/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },

  addAlliance: async (allianceData) => {
    set({ loading: true, error: null });
    try {
      let logoUrl = null;

      // Upload image if provided
      if (allianceData.logoFile) {
        logoUrl = await get().uploadImage(allianceData.logoFile);
      }

      const docData = {
        nombre: allianceData.nombre,
        tipo: allianceData.tipo,
        descripcion: allianceData.descripcion,
        link: allianceData.link || null,
        logo: logoUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "alliances"), docData);

      // Add to local state
      const newAlliance = { id: docRef.id, ...docData };
      set((state) => ({
        alliances: [...state.alliances, newAlliance],
        loading: false,
      }));

      return docRef.id;
    } catch (error) {
      console.error("Error adding alliance:", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateAlliance: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      let logoUrl = updates.logo;

      // Upload new image if provided
      if (updates.logoFile) {
        logoUrl = await get().uploadImage(updates.logoFile);

        // Delete old image if exists
        const currentAlliance = get().alliances.find((a) => a.id === id);
        if (currentAlliance?.logo) {
          try {
            const oldImageRef = ref(storage, currentAlliance.logo);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.log("Old image not found or already deleted");
          }
        }
      }

      const docData = {
        ...updates,
        logo: logoUrl,
        updatedAt: serverTimestamp(),
      };

      // Remove logoFile from docData as it's not needed in Firestore
      delete docData.logoFile;

      await updateDoc(doc(db, "alliances", id), docData);

      // Update local state
      set((state) => ({
        alliances: state.alliances.map((alliance) =>
          alliance.id === id ? { ...alliance, ...docData } : alliance
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating alliance:", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteAlliance: async (id) => {
    set({ loading: true, error: null });
    try {
      // Get alliance data to delete image
      const alliance = get().alliances.find((a) => a.id === id);

      // Delete image from storage if exists
      if (alliance?.logo) {
        try {
          const imageRef = ref(storage, alliance.logo);
          await deleteObject(imageRef);
        } catch (error) {
          console.log("Image not found or already deleted");
        }
      }

      // Delete document from Firestore
      await deleteDoc(doc(db, "alliances", id));

      // Remove from local state
      set((state) => ({
        alliances: state.alliances.filter((alliance) => alliance.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Error deleting alliance:", error);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  getAlliances: () => get().alliances,
  getAlliance: (id) => get().alliances.find((alliance) => alliance.id === id),
}));
