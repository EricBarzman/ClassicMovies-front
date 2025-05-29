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


export function useCountries() {

  const getCountries = async () => {
    const ref = collection(db, 'countries');
    const snap = await getDocs(
      query(ref, orderBy('name'))
    );
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data()));
  };

  const getCountryById = async (id: string) => {
    const ref = doc(db, 'countries', id);
    const snap = await getDoc(ref);
    const refRegion = doc(db, 'regions', snap.data()!.regionId);
    const snapRegion = await getDoc(refRegion);

    return {
      id,
      ...snap.data(),
      region: { ...snapRegion.data() }
    }
  };

  const createCountry = async (data: DocumentData) => {
    const ref = collection(db, 'countries');
    return addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const updateCountry = async (id: string, data: DocumentData) => {
    const ref = doc(db, 'countries', id);
    return updateDoc(ref, data);
  };

  const deleteCountry = async (id: string) => {
    const ref = doc(db, 'countries', id);
    return deleteDoc(ref);
  };

  return {
    getCountries,
    getCountryById,
    createCountry,
    updateCountry,
    deleteCountry,
  }
}