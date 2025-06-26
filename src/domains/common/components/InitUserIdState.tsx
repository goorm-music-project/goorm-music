"use client";

import { useEffect } from "react";
import { userSpotifyStore } from "../stores/userSpotifyStore";

export default function InitUserIdState() {
  const setUserId = userSpotifyStore((set) => set.setUserId);
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, [setUserId]);

  return null;
}
