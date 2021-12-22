import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AuthState {
  loaded: boolean;
  username: string;
}

function useAuthed(isRedirect = true) {
  // validate if user is logged in, if not, redirect to home page
  // a user is logged in if username exists in localStorage
  const router = useRouter();

  const [state, setState] = useState<AuthState>({
    loaded: false,
    username: "",
  });

  useEffect(() => {
    const username = localStorage.getItem("username") as string;
    setState({ loaded: true, username });
  }, [router, setState]);

  useEffect(() => {
    // if not redirect, then that's it
    if (!isRedirect) return;

    // if loaded, and no username found, redirect to register page
    if (state.loaded && !state.username) router.push("/register");
  }, [isRedirect, state, router]);

  return state.username;
}

export default useAuthed;
