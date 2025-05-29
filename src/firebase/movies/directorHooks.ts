import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../client";


export function useDirectors() {

  const getDirectors = async () => {
    const ref = collection(db, 'directors');
    const snap = await getDocs(
      query(ref, orderBy('lastName'))
    );
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data()));
  };

  const getDirectorById = async (id: string) => {
    const ref = doc(db, 'directors', id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id }
  };

  const createDirector = async (data: DocumentData) => {
    const ref = collection(db, 'directors');
    return addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const updateDirector = async (id: string, data: DocumentData) => {
    const ref = doc(db, 'directors', id);
    return updateDoc(ref, data);
  };

  const deleteDirector = async (id: string) => {
    const ref = doc(db, 'directors', id);
    return deleteDoc(ref);
  };

  return {
    getDirectors,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector,
  }
}