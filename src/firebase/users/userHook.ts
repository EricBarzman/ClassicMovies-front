import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, where, type DocumentData } from "firebase/firestore";
import { db } from "../client";
import { ISerializedUser, IAvatar, IVote } from "../../types/user.type";

export function useUsersCollection() {

  async function getUser(id: string): Promise<DocumentData | undefined> {
    const ref = doc(db, 'users', id);
    const snap = await getDoc(ref);
    return { ...snap.data(), id }
  }

  async function getUserByFirebaseId(firebaseId: string): Promise<DocumentData | undefined> {
    const ref = collection(db, 'users')
    const snap = await getDocs(
      query(ref, where("firebaseId", "==", firebaseId)));
    if (snap.docs) return { ...snap.docs[0].data(), id: snap.docs[0].id }
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
    const snap = await getDoc(newRef);

    return {
      ...snap.data(),
      id: snap.id,
    } as ISerializedUser
  }

  async function deleteUser(id: string) {
    const ref = doc(db, "users", id);
    return deleteDoc(ref);
  }

  return { getUser, createUser, updateUser, deleteUser, getUserByFirebaseId }
}

export function useAvatars() {

  async function getAvatars() {
    const ref = collection(db, 'avatars')
    const snap = await getDocs(
      query(ref, orderBy('avatarId'))
    );
    return snap.docs.map(
      doc => Object.assign({}, { id: doc.id }, doc.data())
    ) as IAvatar[];
  };

  return { getAvatars }
}

export function useFavorites() {

  async function getUserFavorites(userId: string) {
    const ref = collection(db, "favorites");
    const snap = await getDocs(
      query(ref, where("userId", "==", userId)));

    if (snap.docs)
      return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data()));
  }

  async function addToFavorites(data: DocumentData) {
    const ref = collection(db, "favorites");
    return addDoc(ref, data);
  }

  async function deleteFromFavorites(favoriteId: string) {
    const ref = doc(db, 'favorites', favoriteId);
    return deleteDoc(ref);
  }

  return { addToFavorites, getUserFavorites, deleteFromFavorites }
}

export function useContactUs() {

  async function sendMessageToUs(data: DocumentData) {
    const ref = collection(db, 'contactUs');
    return addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
  }

  return { sendMessageToUs }
}

export function useVotes() {

  async function getAllVotes() {
    const ref = collection(db, "votes");
    const snap = await getDocs(ref);
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data() as IVote));
  }

  async function getOneUserVotes(userId: string) {
    const ref = collection(db, "votes");
    const snap = await getDocs(query(ref,
      where("userId", "==", userId)
    ))

    if (snap.docs) {
      return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IVote[]
    }
  }

  async function getVotesForOneMovie(movieId: string) {
    const ref = collection(db, "votes");
    const snap = await getDocs(query(
      ref,
      where("movieId", "==", movieId)
    ));
    return snap.docs.map(doc => Object.assign({}, { id: doc.id }, doc.data())) as IVote[]
  }

  async function sendVote(vote: DocumentData) {
    const ref = collection(db, "votes");
    return await addDoc(ref, {
      ...vote,
      createdAt: Timestamp.fromDate(new Date())
    })
  }

  async function updateVote(id: string, vote: DocumentData) {
    const ref = doc(db, 'votes', id);
    return updateDoc(ref, vote);
  }

  return { getAllVotes, getOneUserVotes, getVotesForOneMovie, updateVote, sendVote }
}