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
    [key: string]: any; // 완전한 타입이 아니므로 확장 가능하게
  }

  export function getLyrics(options: Options): Promise<string | null>;
  export function getSong(options: Options): Promise<GeniusSong | null>;
}
