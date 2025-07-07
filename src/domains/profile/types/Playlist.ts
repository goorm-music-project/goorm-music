export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string | null;
  trackCount: number;
  isPublic: boolean;
  ownerId: string;
  ownerNickname: string;
}
