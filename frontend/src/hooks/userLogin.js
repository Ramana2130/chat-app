import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputError({
      username,
      password,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Store only the necessary information in localStorage
      localStorage.setItem(
        "chat-app",
        JSON.stringify({ username: data.username, token: data.token })
      );
      setAuthUser(data);
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputError({ username, password }) {
  if (!username || !password) {
    toast.error("Please Fill in all details");
    return false;
  }
  return true;
}
