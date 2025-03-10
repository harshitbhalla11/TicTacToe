// hoc/withAuth.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { user, initialized } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      // Only perform redirect if auth state has been initialized
      if (initialized && !user) {
        router.push("/landing");
        console.log("Redirecting unauthenticated user to landing.");
      }
    }, [initialized, user, router]);

    // Show a loading state until auth state is determined
    if (!initialized) {
      return <p>Loading auth...</p>;
    }

    // If auth is initialized but there's no user, we can display a "Redirecting" message
    if (!user) {
      return <p>Redirecting...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
