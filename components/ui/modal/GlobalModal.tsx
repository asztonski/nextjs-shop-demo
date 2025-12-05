"use client";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/app/store/auth";
import { useRouter } from "next/navigation";
import { Button } from "../button/Button";

export const GlobalModal = () => {
  const { logout, isUserLoggedIn } = useAuthStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const INACTIVITY_TIME = 900000; // 15 minutes in milliseconds
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isUserLoggedIn) return;

    const resetTimer = () => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setIsModalOpen(true);
        logout();
      }, INACTIVITY_TIME);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Initialize timer
    resetTimer();

    // Add event listeners
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("scroll", handleActivity);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [isUserLoggedIn, logout]);

  const handleClose = () => {
    setIsModalOpen(false);
    router.push("/sign-in");
  };

  return (
    <div
      className={`fixed ease-in-out duration-150 z-50 inset-0 w-full h-screen ${
        isModalOpen ? "" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute w-full h-full inset-0 bg-black opacity-75 flex items-center justify-center z-10" />
      <div className="bg-background text-white absolute h-1/5 flex flex-col justify-center items-center inset-0 m-auto rounded-lg z-20 shadow-lg w-11/12 max-w-md p-6">
        <h5>Due to lack of activity, you have been logged out.</h5>
        <Button className="p-3 mt-6" onClick={handleClose}>
          Ok
        </Button>
      </div>
    </div>
  );
};
