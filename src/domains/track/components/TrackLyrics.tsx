interface TrackLyricsProps {
  lyrics: string | null;
}

export default function TrackLyrics({ lyrics }: TrackLyricsProps) {
  return (
    <div className="rounded border p-5 h-75 overflow-y-auto w-full max-w-md text-sm leading-relaxed">
      {lyrics ? lyrics : "가사를 지원하지 않는 곡입니다."}
    </div>
  );
}
