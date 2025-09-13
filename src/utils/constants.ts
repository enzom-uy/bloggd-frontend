export const API_URL = "http://localhost:3000/api/v1"
export const GAMES_SUGGESTIONS_URL = `${API_URL}/games/search`

// This goes along the query custom hooks so I don't forget to pass the token and cookie
export const QUERY_API_BODY = (sessionToken: string) => {
  return <RequestInit>{
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
    credentials: "include",
  }
}
