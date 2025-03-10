"use client";
import React from "react";
import Link from "next/link";
import withNonAuth from "@/hoc/withNonAuth";
import styles from "./LandingPage.module.scss";

 function LandingPage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to My App</h1>
      <p>Please log in to access protected content.</p>
      <Link href="/auth">
        <button className={styles.button}>Login</button>
      </Link>
    </div>
  );
}

export default withNonAuth(LandingPage);

