import { useCallback } from "react";
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { useMultiSelect } from "../_hooks/use-multi-select";
import { SearchIcon } from "lucide-react";

interface MultiSelectProps<T> {
  filterBy: string;
  options: { name: string; value: T }[];
  defaultItems: { name: string; value: T }[];
  isSearchable?: boolean;
  onValueChange: (value: { name: string; value: T }[]) => void;
}

function MultiSelect<T>({
  filterBy,
  options,
  onValueChange,
  defaultItems,
  isSearchable = false,
}: MultiSelectProps<T>) {
  const ITEM_HEIGHT = 80;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    autoFocus: false,
  };

  const {
    initialOptions,
    selectedItems,
    setSelectedItems,
    placeholder,
    setQuery,
  } = useMultiSelect<T>({
    filterBy,
    defaultItems,
    options,
  });

  const handleChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const values = event.target.value as string[];
      const selectedOptions = values.map(
        (val) => JSON.parse(val) as { name: string; value: T }
      );
      setSelectedItems(selectedOptions);
      onValueChange(selectedOptions);
    },
    [onValueChange, setSelectedItems]
  );

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id={`filter-${filterBy}`}>{filterBy}</InputLabel>
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
        {isSearchable && (
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }}
            />
          </ListSubheader>
        )}

        {initialOptions.map((option) => (
          <MenuItem value={JSON.stringify(option)} key={option.name}>
            <Checkbox
              checked={selectedItems.some((item) => item.name === option.name)}
            />
            <ListItemText
              className="h-fit p-0"
              primary={<p className="h-fit p-0">{option.name}</p>}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export { MultiSelect };
