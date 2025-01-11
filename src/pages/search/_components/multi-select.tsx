import { useCallback } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useMultiSelect } from "../_hooks/use-multi-select";

interface MultiSelectProps<T> {
  filterBy: string;
  options: { name: string; value: T }[];
  defaultItems: { name: string; value: T }[];
  onValueChange: (value: { name: string; value: T }[]) => void;
}

function MultiSelect<T>({
  filterBy,
  options,
  onValueChange,
  defaultItems
}: MultiSelectProps<T>) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  const { selectedItems, setSelectedItems, placeholder } = useMultiSelect<T>({
    filterBy,
    defaultItems
  });


  const handleChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const values = event.target.value as string[];
      const selectedOptions = values.map((val) => JSON.parse(val) as { name: string; value: T });
      setSelectedItems(selectedOptions);
      onValueChange(selectedOptions);
    },
    [onValueChange, setSelectedItems]
  );

  return (
    <div >
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id={`filter-${filterBy}`}>
          {filterBy}
        </InputLabel>
        <Select
          labelId={`filter-${filterBy}`}
          id={`filter-${filterBy}`}
          value={selectedItems.map((item) => JSON.stringify(item))}
          onChange={handleChange}
          multiple
          input={<OutlinedInput label={filterBy} />}
          MenuProps={MenuProps}
          renderValue={() => <p className="!text-sm">{placeholder}</p>}
        >
          {options.map((option) => (
            <MenuItem
              value={JSON.stringify(option)}
              key={option.name}
            >
              <Checkbox
                checked={selectedItems.some(
                  (item) => item.name === option.name
                )}
              />
              <ListItemText className="h-fit p-0" primary={<p className="h-fit p-0">{option.name}</p>} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export { MultiSelect };
