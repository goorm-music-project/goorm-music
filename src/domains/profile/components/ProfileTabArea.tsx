import ProfileTabMenu from "./ProfileTabMenu";
import PlaylistList from "./PlaylistList";
import LikedTrackList from "./LikedTrackList";
import FollowingPlaylist from "./FollowingPlaylist";
import { Playlist, Track } from "@/domains/profile/types/Profile";

interface ProfileTabAreaProps {
  tab: "playlists" | "liked" | "following";
  onTabChange: (tab: "playlists" | "liked" | "following") => void;
  isMe: boolean;
  myPlaylists: Playlist[];
  likedSongs: Track[];
  followedPlaylists: Playlist[];
  onUnlike: (trackId: string) => void;
  onUnfollow: (playlistId: string) => void;
}

export default function ProfileTabArea({
  tab,
  onTabChange,
  isMe,
  myPlaylists,
  likedSongs,
  followedPlaylists,
  onUnlike,
  onUnfollow,
}: ProfileTabAreaProps) {
  return (
    <div className="px-4">
      <ProfileTabMenu
        tab={tab}
        onTabChange={onTabChange}
        tabs={isMe ? ["playlists", "liked", "following"] : ["playlists"]}
      />
      {tab === "playlists" && (
        <PlaylistList playlists={myPlaylists} isMe={isMe} />
      )}
      {tab === "liked" && isMe && (
        <LikedTrackList tracks={likedSongs} onUnlike={onUnlike} />
      )}
      {tab === "following" && isMe && (
        <FollowingPlaylist
          playlists={followedPlaylists}
          onUnfollow={onUnfollow}
        />
      )}
    </div>
  );
}
