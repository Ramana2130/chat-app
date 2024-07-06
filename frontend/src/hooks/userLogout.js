import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        // If the response is successful, clear localStorage and update auth context
        localStorage.removeItem("chat-app");
        setAuthUser(null);
        toast.success("Logout successful");
      } else {
        // If there's an error in the response data, throw an error
        throw new Error(data.error || "Logout failed");
      }
    } catch (error) {
      // Catch and toast any errors that occur during logout
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
