"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaHome } from "react-icons/fa";

export default function NavBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link
          href="/"
          className={`${styles.brand} `}
        >
          <img className={styles.logo} src="/assets/images/logo.png" alt="Logo" />
        </Link>
        <div className={styles.navLinks}>
          {user ? (
            <>
            <span className={styles.greeting}>
                <FaUser className={styles.icon} /> Hello, {user.displayName}
              </span>

              <div className={styles.navLinksTabs}>

              </div>
              <Link
                href="/"
                className={`${styles.button} ${pathname === "/" ? styles.active : ""}`}
              >
                <FaHome className={styles.icon} /> Home
              </Link>
              
              <button className={styles.button} onClick={handleLogout}>
                <FaSignOutAlt className={styles.icon} /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className={`${styles.button} ${pathname === "/auth" ? styles.active : ""}`}
            >
              <FaSignInAlt className={styles.icon} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
