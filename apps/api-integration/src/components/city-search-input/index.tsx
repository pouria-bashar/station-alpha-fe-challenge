import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useDebounced } from "@/hooks/useDebounced";
import { useGeoSearch } from "@/hooks/useGeoSearch";
import { Search } from "lucide-react";
import { useState } from "react";

export default function MobileCitySearchInput() {
  const { setLocation, location } = useAppConfig();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(location.name);
  const debounced = useDebounced(value, 250);

  const { data, isFetched, isFetching } = useGeoSearch({
    query: debounced,
    limit: 8,
  });

  const renderEmptyMessage = () => {
    if (isFetching) {
      return (
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      );
    }
    if (isFetched) {
      return <CommandEmpty>No location found</CommandEmpty>;
    }
    return <CommandEmpty>Search for a location to get started</CommandEmpty>;
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            <Search />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search for a location..."
              className="h-9"
              onValueChange={setValue}
            />
            <CommandList>
              {renderEmptyMessage()}
              <CommandGroup>
                {data?.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={city.id}
                    onSelect={(currentValue) => {
                      const city = data?.find(
                        (city) => city.id === currentValue
                      );
                      if (!city) return;
                      setLocation(city);
                      setOpen(false);
                    }}
                  >
                    {city.name}, {city.state ? city.state + ", " : ""}
                    {city.country}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
