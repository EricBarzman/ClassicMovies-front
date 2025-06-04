import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, type DocumentData } from "firebase/firestore";
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

  async function createUser(data: DocumentData) {
    const ref = collection(db, 'users');
    const newRef = await addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
    // Get the user
    const snap = await getDoc(newRef);
    // Get the avatar

    return {
      ...snap.data(),
      id: snap.id,
    }
  }

  async function deleteUser(id: string) {
    const ref = doc(db, "users", id);
    return deleteDoc(ref);
  }

  return { getUser, createUser, updateUser, deleteUser }
}

export function useAvatars() {

  async function getAvatars() {
    const ref = collection(db, 'avatars')
    const snap = await getDocs(
      query(ref, orderBy('avatarId'))
    );
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data()));
  }

  return { getAvatars }
}