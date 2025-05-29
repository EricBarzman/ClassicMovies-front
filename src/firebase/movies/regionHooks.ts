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
// import { RegionDto } from "@/types/movies.type";


export function useRegions() {

  const getRegions = async () => {
    const ref = collection(db, 'regions');
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data()));
  };

  const getRegionById = async (id: string) => {
    const ref = doc(db, 'regions', id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id }
  };

  const createRegion = async (data: DocumentData) => {
    const ref = collection(db, 'regions');
    return addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const updateRegion = async (id: string, data: DocumentData) => {
    const ref = doc(db, 'regions', id);
    return updateDoc(ref, data);
  };

  const deleteRegion = async (id: string) => {
    const ref = doc(db, 'regions', id);
    return deleteDoc(ref);
  };

  return {
    getRegions,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
  }
}