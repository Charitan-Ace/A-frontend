import { useMemo, useState } from "react";

interface UseMultiSelectProps<T> {
  filterBy: string;
  defaultItems: {name: string, value: T}[];
}

const useMultiSelect = <T,>({ filterBy, defaultItems }: UseMultiSelectProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; value: T }[]
  >(defaultItems);

  const placeholder = useMemo(() => {
    if (selectedItems.length === 0) {
      return `Filter by ${filterBy}`;
    }
    if (selectedItems.length > 2) {
      return `${selectedItems.length} ${filterBy} selected`;
    }
    return selectedItems.map(item => item.name).join(", ");
  }, [selectedItems, filterBy]);

  return { selectedItems, setSelectedItems, placeholder };
};

export { useMultiSelect };
