"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebaseClient";

export const useLiveStream = () => {
  const [streams, setStreams] = useState([]);
  const [currentStream, setCurrentStream] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = useCallback(async (file) => {
    if (!storage) {
      throw new Error("Firebase Storage no está configurado");
    }

    try {
      const timestamp = Date.now();
      const fileName = `banners/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }, []);

  const loadStreamsFromFirebase = useCallback(async () => {
    if (!db) {
      console.log("Firebase no está configurado, usando datos locales");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "liveStreams"));
      const streamsData = [];
      querySnapshot.forEach((doc) => {
        streamsData.push({ id: doc.id, ...doc.data() });
      });
      setStreams(streamsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading streams from Firebase:", error);
      setIsLoading(false);
    }
  }, []);

  const subscribeToStreams = useCallback(() => {
    if (!db) {
      console.log(
        "Firebase no está configurado, no se puede suscribir a cambios en tiempo real"
      );
      return () => {};
    }

    try {
      const unsubscribe = onSnapshot(
        collection(db, "liveStreams"),
        (snapshot) => {
          const streamsData = [];
          snapshot.forEach((doc) => {
            streamsData.push({ id: doc.id, ...doc.data() });
          });
          setStreams(streamsData);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.error("Error subscribing to streams:", error);
      return () => {};
    }
  }, []);

  const addStream = useCallback(async (streamData) => {
    const newStream = {
      ...streamData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!db) {
      console.log("Firebase no está configurado, guardando solo localmente");
      const localStream = { ...newStream, id: crypto.randomUUID() };
      setStreams((prev) => [...prev, localStream]);
      return;
    }

    try {
      await addDoc(collection(db, "liveStreams"), newStream);
      // El onSnapshot se encargará de actualizar el estado automáticamente
    } catch (error) {
      console.error("Error adding stream to Firebase:", error);
      // Fallback: guardar solo localmente si Firebase falla
      const localStream = { ...newStream, id: crypto.randomUUID() };
      setStreams((prev) => [...prev, localStream]);
    }
  }, []);

  const updateStream = useCallback(async (id, updates) => {
    const updatedData = { ...updates, updatedAt: new Date() };

    if (db) {
      try {
        await updateDoc(doc(db, "liveStreams", id), updatedData);
      } catch (error) {
        console.error("Error updating stream in Firebase:", error);
      }
    }

    // Actualizar localmente siempre
    setStreams((prev) =>
      prev.map((stream) =>
        stream.id === id ? { ...stream, ...updatedData } : stream
      )
    );
  }, []);

  const deleteStream = useCallback(async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, "liveStreams", id));
      } catch (error) {
        console.error("Error deleting stream from Firebase:", error);
      }
    }

    // Eliminar localmente siempre
    setStreams((prev) => prev.filter((stream) => stream.id !== id));
    setCurrentStream((prev) => (prev?.id === id ? null : prev));
  }, []);

  const toggleStreamActive = useCallback(
    async (id) => {
      const streamToToggle = streams.find((s) => s.id === id);

      if (streamToToggle) {
        const updatedData = {
          isActive: !streamToToggle.isActive,
          updatedAt: new Date(),
        };

        if (db) {
          try {
            await updateDoc(doc(db, "liveStreams", id), updatedData);
          } catch (error) {
            console.error(
              "Error toggling stream active state in Firebase:",
              error
            );
          }
        }

        // Actualizar localmente
        setStreams((prev) =>
          prev.map((stream) =>
            stream.id === id
              ? { ...stream, isActive: !stream.isActive, updatedAt: new Date() }
              : stream
          )
        );
      }
    },
    [streams]
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const getActiveStream = useCallback(() => {
    return streams.find((stream) => stream.isActive) || null;
  }, [streams]);

  // const getStreamToShow = useCallback(() => {
  //   const now = new Date();
  //   const today = now.toDateString();

  //   console.log("streams", streams);

  //   return (
  //     streams.find((stream) => {
  //       if (!stream.activeDate) {
  //         return false;
  //       }

  //       const activeDate = new Date(stream.activeDate);

  //       return activeDate.toDateString() == today;
  //     }) || null
  //   );
  // }, [streams]);

  const getStreamToShow = useCallback(() => {
    const now = new Date();

    // Formateamos la fecha actual como YYYY-MM-DD
    const today = now.toISOString().split("T")[0];

    return (
      streams.find((stream) => {
        if (!stream.activeDate) return false;

        return stream.activeDate == today;
      }) || null
    );
  }, [streams]);

  useEffect(() => {
    loadStreamsFromFirebase();
    const unsubscribe = subscribeToStreams();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loadStreamsFromFirebase, subscribeToStreams]);

  return {
    streams,
    currentStream,
    isModalOpen,
    isLoading,
    uploadImage,
    loadStreamsFromFirebase,
    subscribeToStreams,
    addStream,
    updateStream,
    deleteStream,
    setCurrentStream,
    toggleStreamActive,
    openModal,
    closeModal,
    getActiveStream,
    getStreamToShow,
  };
};
