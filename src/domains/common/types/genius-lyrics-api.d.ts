declare module "genius-lyrics-api" {
  interface Options {
    apiKey: string;
    title: string;
    artist: string;
    optimizeQuery?: boolean;
  }

  export function getLyrics(options: Options): Promise<string | null>;
  export function getSong(options: Options): Promise<any>;
}