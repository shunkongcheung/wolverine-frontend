import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useAuthed() {
  // validate if user is logged in, if not, redirect to home page
  // a user is logged in if username exists in localStorage
  const router = useRouter();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) router.push("/");
    setUsername(username as string);
  }, [router, setUsername]);

  return username;
}

export default useAuthed;
