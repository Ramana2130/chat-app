import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      //localstorage
      localStorage.setItem("chat-app", JSON.stringify(data));
      //context
      setAuthUser(data);
      toast.success("User Registred successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please Fill in all details");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password does'nt Match");
    return false;
  }

  if (password.length < 4) {
    toast.error("Password must be atleast 4 characters");
    return false;
  }
  return true;
}
