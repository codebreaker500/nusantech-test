
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
    const debounced = useDebouncedCallback(
        (value) => {
            onSearch(value);
        },
        1000
    );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debounced(value);
  };

  return (
    <div className="relative w-full px-4 mb-4">
      <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search..."
        onChange={onChange}
        className="pl-9"
      />
    </div>
  );
}
