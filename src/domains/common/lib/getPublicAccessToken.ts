import axios from "axios";
import { setCookie } from "./cookieUtils";

export const getPublicAccessToken = async (): Promise<string | null> => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

  if (!clientId || !clientSecret) {
    console.error("Missing Spotify Credentials");
    return null;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, expires_in } = res.data;

  if (!access_token) {
    console.error("Failed to retrieve access token");
    return null;
  }

  setCookie("public_access_token", access_token, expires_in);

  return res.data.access_token;
};
