export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  order: number;
  profile_path: string | null;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBExternalIds {
  imdb_id: string | null;
  wikidata_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
}

export interface TMDBMovieDetailsRaw {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  tagline: string | null;
  status: string;
  vote_average: number;
  vote_count: number;
  credits?: {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
  };
  external_ids?: TMDBExternalIds;
}
