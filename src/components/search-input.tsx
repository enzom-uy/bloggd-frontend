import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function useGetUserInputDelay(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const SearchInputContent = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useGetUserInputDelay(inputValue, 500);
  const lastSearched = useRef("");

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: async () => {
      if (!debouncedValue || debouncedValue === lastSearched.current)
        return null;
      console.log("Searching: ", debouncedValue);
      lastSearched.current = debouncedValue;
      const res = await fetch(
        `http://localhost:3000/api/v1/games/search?game_name=${debouncedValue}`,
      ).then(
        (res) =>
          res.json() as Promise<{
            message: string;
            games: { name: string; igdbId: number }[];
          }>,
      );
      console.log("Respuesta de la query: ", res);
      return res;
    },
    enabled: !!debouncedValue,
  });

  useEffect(() => {
    if (debouncedValue) {
      console.log("Searching: ", debouncedValue);
      console.log("Query data: ", data);
    }
  }, [debouncedValue, data]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        className="max-w-80"
        type="search"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        {isLoading && "Loading..."}
        {data && data.games.length > 0 && (
          <ul>
            {data.games.map((game) => (
              <li>
                {game.name} - {game.igdbId}
              </li>
            ))}
          </ul>
        )}
        {data?.games.length === 0 && "No results"}
      </div>
    </div>
  );
};

const client = new QueryClient();
export const SearchInput = () => {
  return (
    <QueryClientProvider client={client}>
      <SearchInputContent />
    </QueryClientProvider>
  );
};

export default SearchInput;
