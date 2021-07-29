import omdbAPI from "./omdbAPI";

export function search(searchQuery, page = 1, cancelToken) {
  return omdbAPI({
    cancelToken,
    params: {
      page,
      s: searchQuery
    }
  })
}

export function getDetail(imdbId) {
  return omdbAPI({
    params: {
      i: imdbId,
      plot: "full"
    }
  })
}