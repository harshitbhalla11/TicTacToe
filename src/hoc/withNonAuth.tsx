"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const withNonAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithNonAuth = (props: any) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
      if (user) {
        router.push("/");
      }
    }, [user, router]);

    if (user) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithNonAuth;
};

export default withNonAuth;
