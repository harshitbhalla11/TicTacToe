"use client";
import React, { useEffect, useRef } from "react";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../../firebase";
import * as firebaseui from "firebaseui";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

export default function FirebaseAuthUI() {
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!uiRef.current) return;

    const uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: "/", 
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID, 
      ],
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, uiConfig);

    return () => {
      ui.reset();
    };
  }, []);

  return <div ref={uiRef} />;
}
