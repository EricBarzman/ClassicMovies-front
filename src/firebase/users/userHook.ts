import { deleteDoc, doc, getDoc, updateDoc, type DocumentData } from "firebase/firestore";
import { db } from "../client";

export function useUsersCollection() {

  async function getUser(id: string): Promise<DocumentData | undefined> {
    const ref = doc(db, 'users', id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id }
  }

  async function updateUser(id: string, data: DocumentData) {
    const ref = doc(db, 'users', id);
    return updateDoc(ref, data);
  }

  async function deleteUser(id: string) {
    const ref = doc(db, "users", id);
    return deleteDoc(ref);
  }

  return { getUser, updateUser, deleteUser }
}