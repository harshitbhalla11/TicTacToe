"use client"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/NavBar";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { useAuthObserver } from "@/hooks/useAuthObserver";

function AuthObserverWrapper({ children }: { children: React.ReactNode }) {
  useAuthObserver();
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthObserverWrapper>
            <NavBar />
            <main style={{ marginTop: "96px" }}>
              {children}
            </main>
          </AuthObserverWrapper>
        </Provider>
      </body>
    </html>
  );
}
