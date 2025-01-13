import { useEffect, useMemo, useState } from "react";

interface UseMultiSelectProps<T> {
  filterBy: string;
  defaultItems: { name: string; value: T }[];
  options: { name: string; value: T }[];
}

const useMultiSelect = <T,>({
  filterBy,
  defaultItems,
  options,
}: UseMultiSelectProps<T>) => {
  const [selectedItems, setSelectedItems] =
    useState<{ name: string; value: T }[]>(defaultItems);

  const [initialOptions, setInitialOptions] =
    useState<{ name: string; value: T }[]>(options);

  const [query, setQuery] = useState<string | undefined>(undefined);

  const placeholder = useMemo(() => {
    if (selectedItems.length === 0) {
      return `Filter by ${filterBy}`;
    }
    if (selectedItems.length > 2) {
      return `${selectedItems.length} ${filterBy} selected`;
    }
    return selectedItems.map((item) => item.name).join(", ");
  }, [selectedItems, filterBy]);

  useEffect(() => {

    if (query === undefined || query.length === 0) {
      setInitialOptions(options);
      return;
    }
    setInitialOptions(
      initialOptions.filter((item) => item.name.includes(query))
    );
  }, [query]);

  return {
    initialOptions,
    setInitialOptions,
    selectedItems,
    setSelectedItems,
    placeholder,
    setQuery,
  };
};

export { useMultiSelect };
