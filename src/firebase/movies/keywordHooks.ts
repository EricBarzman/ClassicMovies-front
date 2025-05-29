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


export function useKeywords() {

  const getKeywords = async () => {
    const ref = collection(db, 'keywords');
    const snap = await getDocs(
      query(ref, orderBy('label'))
    );
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data()));
  };

  const getKeywordById = async (id: string) => {
    const ref = doc(db, 'keywords', id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id }
  };

  const createKeyword = async (data: DocumentData) => {
    const ref = collection(db, 'keywords');
    return addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const updateKeyword = async (id: string, data: DocumentData) => {
    const ref = doc(db, 'keywords', id);
    return updateDoc(ref, data);
  };

  const deleteKeyword = async (id: string) => {
    const ref = doc(db, 'keywords', id);
    return deleteDoc(ref);
  };

  return {
    getKeywords,
    getKeywordById,
    createKeyword,
    updateKeyword,
    deleteKeyword,
  }
}