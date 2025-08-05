import { create } from "zustand";
import { PlaylistDetail, PlaylistItem } from "../types/Playlist";

interface PlaylistProps {
  listData: PlaylistDetail | null;
  tracks: PlaylistItem[];
  snapshotId: string;
  canEdit: boolean | undefined;
  name: string;
  description: string;
  isPublic: boolean;
  setListData: (data: PlaylistDetail) => void;
  setTracks: (tracks: PlaylistItem[]) => void;
  setSnapshotId: (id: string) => void;
  setCanEdit: (canEdit: boolean) => void;
  setName: (name: string) => void;
  setDescription: (desc: string) => void;
  setIsPublic: (isPublic: boolean) => void;
}

export const usePlaylistProps = create<PlaylistProps>((set) => ({
  listData: null,
  tracks: [],
  snapshotId: "",
  canEdit: undefined,
  name: "",
  description: "",
  isPublic: true,
  setListData: (data) => set({ listData: data }),
  setTracks: (tracks) => set({ tracks }),
  setSnapshotId: (id) => set({ snapshotId: id }),
  setCanEdit: (canEdit) => set({ canEdit }),
  setName: (name) => set({ name }),
  setDescription: (desc) => set({ description: desc }),
  setIsPublic: (isPublic) => set({ isPublic }),
}));
