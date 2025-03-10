// hooks/useAuthObserver.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { setUser, setInitialized } from "@/redux/feature/authSlice";

export function useAuthObserver() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(setUser(firebaseUser));
      dispatch(setInitialized(true));
    });
    return () => unsubscribe();
  }, [dispatch]);
}
