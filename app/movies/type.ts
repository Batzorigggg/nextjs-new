export type Movie = {
  id: string;
  title: string;
  genres: string[];
  plot: string;
  poster: string;
  year: string;
  imdb: { rating: number | null; votes: number | null } | null;
};
