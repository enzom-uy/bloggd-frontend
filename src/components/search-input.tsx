import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandItem, CommandList } from "./ui/command";
import { useHandlerSearchPopover } from "@/hooks/useHandleSearchPopover";

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

  const { handleInputFocus, isPopoverOpen, inputRef } = useHandlerSearchPopover(
    { data, isLoading },
  );

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
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleInputFocus}
        onClick={handleInputFocus}
      />

      <Popover open={isPopoverOpen}>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              {isLoading && "Loading..."}
              {data && data.games.length > 0 && (
                <>
                  {data.games.map((game) => (
                    <CommandItem
                      key={game.igdbId}
                      value={`${game.igdbId}`}
                      onSelect={() => console.log("Selected: ", game.name)}
                    >
                      {game.name} - {game.igdbId}
                    </CommandItem>
                  ))}
                </>
              )}
              {data?.games.length === 0 && "No results"}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col gap-2"></div>
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
