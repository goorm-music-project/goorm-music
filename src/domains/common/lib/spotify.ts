export async function fetchSpotify<T>(
  url: string,
  accessToken: string
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 }, // ISR 적용 (선택)
  });

  if (!res.ok) {
    throw new Error("Spotify API fetch failed");
  }

  return res.json();
}
