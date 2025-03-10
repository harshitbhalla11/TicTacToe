"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/app/firebase";
import withNonAuth from "@/hoc/withNonAuth";
import styles from "./Auth.module.scss";
import {FaSignInAlt,FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importing icons

function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: username });
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authContainer}>
        <div className={styles.menu}>
          <button
            className={`${styles.menuButton} ${
              mode === "login" ? styles.active : ""
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`${styles.menuButton} ${
              mode === "signup" ? styles.active : ""
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>
        {mode === "login" ? (
          <>
            <h1>Login</h1>
            <form onSubmit={handleEmailLogin} className={styles.authForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  <FaEnvelope  className="me-2"/> Email:
                </label>
                <input
                  className={styles.authInput}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">
                  <FaLock className="me-2"/> Password:
                </label>
                <input
                  className={styles.authInput}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.authButton}>
  <FaSignInAlt  className="me-2"/> Login with Email
</button>

            </form>
            <hr className={styles.authHr} />
            <button onClick={handleGoogleLogin} className={`google ${styles.authButton}`}>
              <FaGoogle  className="me-2"/> Login with Google
            </button>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp} className={styles.authForm}>
              <div className={styles.formGroup}>
                <label htmlFor="username">
                  <FaUser /> Username:
                </label>
                <input
                  className={styles.authInput}
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  <FaEnvelope /> Email:
                </label>
                <input
                  className={styles.authInput}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">
                  <FaLock /> Password:
                </label>
                <input
                  className={styles.authInput}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.authButton}>
                Sign Up
              </button>
            </form>
          </>
        )}
        {error && <p className={styles.authError}>{error}</p>}
      </div>
    </div>
  );
}

export default withNonAuth(AuthPage);
