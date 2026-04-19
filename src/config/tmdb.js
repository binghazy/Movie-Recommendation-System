const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const safeProcessEnv =
  typeof process !== "undefined" && process && process.env ? process.env : {};

const normalizeEnv = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/^['"]|['"]$/g, "");
};

const rawTmdbApiKey = normalizeEnv(safeProcessEnv.REACT_APP_TMDB_API_KEY);
const rawTmdbBearerToken = normalizeEnv(
  safeProcessEnv.REACT_APP_TMDB_BEARER_TOKEN,
);

// Many users paste TMDB v4 bearer token into REACT_APP_TMDB_API_KEY.
const derivedBearerToken =
  rawTmdbBearerToken || (rawTmdbApiKey.includes(".") ? rawTmdbApiKey : "");
const derivedApiKey = derivedBearerToken ? "" : rawTmdbApiKey;

const hasTmdbCredentials = Boolean(derivedApiKey || derivedBearerToken);

const FALLBACK_TMDB_MOVIES = [
  {
    id: 872585,
    title: "DUNE",
    poster_path: "/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    backdrop_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    vote_average: 8.1,
    release_date: "2023-07-19",
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    vote_average: 8.3,
    release_date: "2024-02-27",
  },
  {
    id: 603692,
    title: "John Wick: Chapter 4",
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdrop_path: "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
    vote_average: 7.7,
    release_date: "2023-03-22",
  },
  {
    id: 634649,
    title: "Spider-Man: No Way Home",
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    vote_average: 8.0,
    release_date: "2021-12-15",
  },
  {
    id: 157336,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    vote_average: 8.4,
    release_date: "2014-11-05",
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    vote_average: 8.5,
    release_date: "2008-07-16",
  },
  {
    id: 13,
    title: "Forrest Gump",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    vote_average: 8.5,
    release_date: "1994-06-23",
  },
  {
    id: 238,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    vote_average: 8.7,
    release_date: "1972-03-14",
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    vote_average: 8.7,
    release_date: "1994-09-23",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    vote_average: 8.5,
    release_date: "1994-09-10",
  },
  {
    id: 27205,
    title: "Inception",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    vote_average: 8.4,
    release_date: "2010-07-15",
  },
  {
    id: 24428,
    title: "The Avengers",
    poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    backdrop_path: "/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    vote_average: 7.7,
    release_date: "2012-04-25",
  },
];

const buildTmdbUrl = (path, query = {}) => {
  const params = new URLSearchParams({
    language: "en-US",
    ...query,
  });

  if (derivedApiKey) {
    params.set("api_key", derivedApiKey);
  }

  return `${TMDB_BASE_URL}${path}?${params.toString()}`;
};

const mapMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  backdrop_path: movie.backdrop_path,
  vote_average: movie.vote_average,
  release_date: movie.release_date,
  overview: movie.overview,
});

async function fetchTmdb(path, query = {}) {
  if (!hasTmdbCredentials) {
    throw new Error("TMDB credentials are not configured.");
  }

  const headers = {};
  if (derivedBearerToken) {
    headers.Authorization = `Bearer ${derivedBearerToken}`;
  }

  const response = await fetch(buildTmdbUrl(path, query), { headers });
  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}.`);
  }

  return response.json();
}

const getFallbackMoviesByPage = (page = 1, pageSize = 12) => {
  const normalizedPage = Math.max(Number(page) || 1, 1);
  const startIndex = (normalizedPage - 1) * pageSize;
  const repeated = Array.from({ length: 5 }).flatMap((_, repeatIndex) =>
    FALLBACK_TMDB_MOVIES.map((movie) => ({
      ...movie,
      id: repeatIndex === 0 ? movie.id : Number(`${repeatIndex}${movie.id}`),
    })),
  );

  return repeated.slice(startIndex, startIndex + pageSize);
};

async function getTmdbMovieCollection(path, query = {}) {
  try {
    const data = await fetchTmdb(path, query);
    if (Array.isArray(data.results) && data.results.length > 0) {
      return data.results.map(mapMovie);
    }
  } catch (error) {
    // Fallback is returned below if TMDB is unavailable.
  }

  return getFallbackMoviesByPage(query.page, 12);
}

function getTmdbImage(path, size = "w780") {
  if (!path) {
    return "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80";
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

function getTmdbMovieUrl(id) {
  return `https://www.themoviedb.org/movie/${id}`;
}

export {
  FALLBACK_TMDB_MOVIES,
  getTmdbImage,
  getTmdbMovieCollection,
  getTmdbMovieUrl,
  hasTmdbCredentials,
};
