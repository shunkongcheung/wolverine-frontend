import type { AppProps } from "next/app";
import { useEffect } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { getFirebaseApp } from "../utils";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const run = async () => {
      getFirebaseApp();
      const db = getFirestore();
      await setDoc(doc(db, "users", "testing1"), {
        name: "testing1",
      });
    };

    run();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
