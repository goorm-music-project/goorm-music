declare module "genius-lyrics-api" {
  export interface Options {
    apiKey: string;
    title: string;
    artist: string;
    optimizeQuery?: boolean;
  }

  export interface GeniusSong {
    id: number;
    title: string;
    url: string;
    artist: string;
    album?: string;
    lyrics?: string;
    release_date?: string;
    featured_artists?: string[];
    primary_artist?: {
      id: number;
      name: string;
      url: string;
    };
    stats?: {
      pageviews?: number;
      hot?: boolean;
    };
    thumbnail?: string;
    image?: string;
    [key: string]: unknown;
  }

  export function getLyrics(options: Options): Promise<string | null>;
  export function getSong(options: Options): Promise<GeniusSong | null>;
}