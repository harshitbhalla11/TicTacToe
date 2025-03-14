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
      if (initialized && !user) {
        router.push("/landing");
        console.log("Redirecting unauthenticated user to landing.");
      }
    }, [initialized, user, router]);

    if (!initialized) {
      return <p>Loading auth...</p>;
    }

    if (!user) {
      return <p>Redirecting...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
