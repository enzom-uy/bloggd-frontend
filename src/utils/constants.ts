export const API_URL = "http://localhost:3000/api/v1"

export const API_URLS = {
  BASE_URL: API_URL,
  GAMES_SUGGESTIONS: `${API_URL}/games/search`,
  GET_GAME_BY_ID: `${API_URL}/games/`,
}

// This goes along the query custom hooks so I don't forget to pass the token and cookie
export const QUERY_API_BODY = (sessionToken: string | undefined | null) => {
  return <RequestInit>{
    headers: {
      Authorization: sessionToken ? `Bearer ${sessionToken}` : "",
    },
    credentials: "include",
  }
}
