import ProfileTabMenu from "./ProfileTabMenu";
import PlaylistList from "./PlaylistList";
import LikedTrackList from "./LikedTrackList";
import FollowingPlaylist from "./FollowingPlaylist";

interface ProfileTabAreaProps {
  tab: "playlists" | "liked" | "following";
  onTabChange: (tab: "playlists" | "liked" | "following") => void;
  isMe: boolean;
  userId: string;
}

export default function ProfileTabArea({
  tab,
  onTabChange,
  isMe,
  userId,
}: ProfileTabAreaProps) {
  return (
    <div className="px-4">
      <ProfileTabMenu
        tab={tab}
        onTabChange={onTabChange}
        tabs={isMe ? ["playlists", "liked", "following"] : ["playlists"]}
      />
      {tab === "playlists" && <PlaylistList userId={userId} isMe={isMe} />}
      {tab === "liked" && isMe && <LikedTrackList isMe={isMe} />}
      {tab === "following" && isMe && <FollowingPlaylist isMe={isMe} />}
    </div>
  );
}
