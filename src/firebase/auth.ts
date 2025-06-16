import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateEmail, getAuth } from 'firebase/auth';
import { auth } from './client';
import { useNavigate } from 'react-router-dom';
import { useUsersCollection } from './users/userHook.ts';
import { useEffect } from 'react';

export function useAuth() {
  const navigate = useNavigate();

  async function logout() {
    await auth.signOut();
    navigate("/");
  }

  async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async function updateEmailInFirebaseAuth(email: string) {
    const user = getAuth().currentUser;
    if (!user) throw new Error("Pas d'utilisateur sur Firebase");
    return await updateEmail(user, email);
  }

  return { logout, login, signup, updateEmailInFirebaseAuth }
}

export const useOnAuthStateChanged = (
  setUserId: React.Dispatch<React.SetStateAction<string | null>>,
) => {

  const { getUser } = useUsersCollection();

  useEffect(() => {
    auth.onAuthStateChanged(nexOrObserver => {
      if (nexOrObserver) {
        getUser(nexOrObserver.uid).then(user => {
          setUserId(nexOrObserver.uid);
          localStorage.setItem("userId", nexOrObserver.uid);
          localStorage.setItem("user", JSON.stringify(user));
        })
      }
    })
  }, [auth.currentUser])
}