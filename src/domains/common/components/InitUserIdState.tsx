"use client";

import { useEffect } from "react";
import { useSpotifyStore } from "../stores/useSpotifyStore";

export default function InitUserIdState() {
  const setUserId = useSpotifyStore((set) => set.setUserId);
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) setUserId(storedId);
  }, [setUserId]);

  return null;
}
