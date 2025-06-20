export const getAccessToken = async (): Promise<string | null> => {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  if (!clientId || !clientSecret) {
    console.error("Missing Spotify Credentials");
    return null;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!res.ok) {
    console.log("Access Token fetch error: ", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.access_token;
};
