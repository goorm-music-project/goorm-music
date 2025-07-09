import { create } from "zustand";
import { Profile } from "../types/Profile";
import { Playlist } from "../types/Profile";
import { Track } from "../types/Profile";

type TabKey = "playlists" | "liked" | "following";

interface ProfileState {
  profile: Profile | null;
  playlists: Playlist[];
  likedTracks: Track[];
  followingPlaylists: Playlist[];
  tab: TabKey;
  setTab: (tab: TabKey) => void;
  setProfile: (profile: Profile) => void;
  setPlaylists: (playlists: Playlist[]) => void;
  setLikedTracks: (tracks: Track[]) => void;
  setFollowingPlaylists: (playlists: Playlist[]) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  playlists: [],
  likedTracks: [],
  followingPlaylists: [],
  tab: "playlists",
  setTab: (tab) => set({ tab }),
  setProfile: (profile) => set({ profile }),
  setPlaylists: (playlists) => set({ playlists }),
  setLikedTracks: (tracks) => set({ likedTracks: tracks }),
  setFollowingPlaylists: (playlists) => set({ followingPlaylists: playlists }),
}));
