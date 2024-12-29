import useDebounce from "@/hooks/use-debounce";
import { DataGridTableBodyCell, DataGridTableBodyRow } from "../components";
import { useDataGrid } from "./DataGridProvider";
import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { parseJson } from "@/lib/helpers/common.helper";
import { base64DecodeUnicode } from "@/lib/helpers/encode.helper";

const DataGridFilter = () => {
  const { filterColumns } = useDataGrid();

  if (!filterColumns) {
    return <></>;
  }

  if (filterColumns.length === 0) {
    return <></>;
  }

  return (
    <DataGridTableBodyRow id="filter-row">
      {filterColumns.map((col, cellIndex: number) => {
        if (!col)
          return (
            <DataGridTableBodyCell key={cellIndex} id={`filter-`}>
              <span />
            </DataGridTableBodyCell>
          );
        return (
          <DataGridTableBodyCell key={cellIndex} id={`filter-${col.id}`}>
            {col && (
              <>
                {col.type === "id" && (
                  <FilteredInputById id={col.id} label={col.label} />
                )}
                {col.type === "text" && (
                  <FilteredInput id={col.id} label={col.label} />
                )}
                {col.type === "select" && (
                  <FilteredSelect
                    options={col.options}
                    id={col.id}
                    label={col.label}
                  />
                )}
                {col.type === "date" && (
                  <FilteredDate id={col.id} label={col.label} />
                )}
                {col.type === "number" && (
                  <FilteredNumber id={col.id} label={col.label} />
                )}
              </>
            )}
          </DataGridTableBodyCell>
        );
      })}
    </DataGridTableBodyRow>
  );
};

export default DataGridFilter;

const FilteredDate = ({ id, label }) => {
  const params = new URLSearchParams(window.location.search);
  const queryData = params.get(id);

  let initFilter = null;

  try {
    const parsedData = queryData ? JSON.parse(queryData) : null;
    initFilter = parsedData?.__gte ? new Date(parsedData.__gte) : null;
  } catch (error) {
    console.warn(`Failed to parse query parameter for ${id}:`, error);
  }

  const { setFilters, filters } = useDataGrid();
  const [date, setDate] = useState<Date | null>(initFilter);

  useEffect(() => {
    const updatedParams = new URLSearchParams(window.location.search);

    const filterValue = {
      __gte: moment(date).startOf("day").toISOString(),
      __lt: moment(date).add(1, "day").startOf("day").toISOString(),
    };

    const updatedFilters = {
      ...filters,
      [id]: filterValue,
    };

    if (!date) {
      delete updatedFilters[id];
    }
    setFilters(updatedFilters);
    if (date) {
      updatedParams.set(id, JSON.stringify(filterValue));
    } else {
      updatedParams.delete(id);
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedParams.toString()}`
    );
  }, [date]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="flex items-center gap-2">
      {/* <label className="text-sm font-medium">{label}</label> */}
      <DatePicker
        placeholderText={`${label}`}
        className="relative input z-50"
        selected={date}
        onChange={handleDateChange}
      />
    </div>
  );
};

const FilteredInputById = ({ id, label }) => {
  const params = new URLSearchParams(window.location.search);
  const queryData = params.get(id) || "";

  // const filterValue = queryData ? JSON.parse(queryData).$regex : '';
  const [inputValue, setInputValue] = useState(queryData);

  const { setFilters, filters } = useDataGrid();

  const debouncedValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    const updatedFilters = { ...filters };

    if (debouncedValue) {
      updatedFilters[id] = debouncedValue;
    } else {
      delete updatedFilters[id];
    }
    setFilters(updatedFilters);

    const updatedParams = new URLSearchParams(window.location.search);
    if (debouncedValue) {
      updatedParams.set(id, debouncedValue);
    } else {
      updatedParams.delete(id);
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedParams.toString()}`
    );
  }, [debouncedValue]);

  return (
    <input
      className="input"
      type="text"
      placeholder={`Tìm theo ${label}`}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value.trim())}
    />
  );
};

const FilteredInput = ({ id, label }) => {
  const params = new URLSearchParams(window.location.search);
  const queryData = params.get(id) || "";

  const filterValue = queryData ? JSON.parse(queryData).$regex : "";
  const [inputValue, setInputValue] = useState(filterValue);

  const { setFilters, filters } = useDataGrid();

  const debouncedValue = useDebounce(inputValue?.trim(), 700);

  useEffect(() => {
    const updatedFilters = { ...filters };

    if (debouncedValue) {
      updatedFilters[id] = { $regex: debouncedValue, $options: "i" };
    } else {
      delete updatedFilters[id];
    }

    setFilters(updatedFilters);

    const updatedParams = new URLSearchParams(window.location.search);
    if (debouncedValue) {
      updatedParams.set(
        id,
        JSON.stringify({ $regex: debouncedValue, $options: "i" })
      );
    } else {
      updatedParams.delete(id);
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedParams.toString()}`
    );
  }, [debouncedValue]);

  return (
    <input
      className="input"
      type="text"
      placeholder={`Tìm theo ${label}`}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

const FilteredSelect = ({ id, label, options }) => {
  const params = new URLSearchParams(window.location.search);
  const queryData = params.get(id);

  const { setFilters, filters } = useDataGrid();

  const onChange = (value) => {
    const updatedFilters = {
      ...filters,
      [id]: value,
    };

    if (!value) {
      delete updatedFilters[id];
    }

    setFilters(updatedFilters);

    const updatedParams = new URLSearchParams(window.location.search);
    if (value) {
      updatedParams.set(id, value);
    } else {
      updatedParams.delete(id);
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedParams.toString()}`
    );
  };

  const defaultValue = queryData || "";

  return (
    <select
      className="select"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={defaultValue}
    >
      <option value="">{`Chọn ${label}`}</option>
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const FilteredNumber = ({ id, label }) => {
  const params = new URLSearchParams(window.location.search);
  const queryData = params.get(id);
  let initFilter = { __gte: "", __lte: "" };

  try {
    initFilter = queryData ? JSON.parse(queryData) : { __gte: "", __lte: "" };
  } catch (error) {
    console.warn(`Failed to parse query parameter for ${id}:`, error);
  }

  const { setFilters, filters } = useDataGrid();
  const [range, setRange] = useState({
    min: initFilter.__gte?.toString() || "",
    max: initFilter.__lte?.toString() || "",
  });

  const debouncedRange = useDebounce(range, 700);

  useEffect(() => {
    const { min, max } = debouncedRange;

    if (min || max) {
      setFilters({
        ...filters,
        [id]: {
          ...(min && { __gte: Number(min) }),
          ...(max && { __lte: Number(max) }),
        },
      });
    } else {
      const { [id]: removed, ...rest } = filters;
      setFilters(rest);
    }

    const updatedParams = new URLSearchParams(window.location.search);
    if (min || max) {
      updatedParams.set(
        id,
        JSON.stringify({
          ...(min && { __gte: Number(min) }),
          ...(max && { __lte: Number(max) }),
        })
      );
    } else {
      updatedParams.delete(id);
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedParams.toString()}`
    );
  }, [debouncedRange]);

  const handleChange = (key, value) => {
    const sanitizedValue = value === "" ? "" : Math.max(0, Number(value));
    setRange((prevRange) => ({
      ...prevRange,
      [key]: sanitizedValue,
    }));
  };

  return (
    <div className="flex items-center gap-2">
      {/* <label className="text-sm font-medium">{label}</label> */}
      <input
        type="number"
        className="input"
        placeholder="Min"
        value={range.min}
        onChange={(e) => handleChange("min", e.target.value)}
        min="0"
      />
      <span className="text-gray-500">-</span>
      <input
        type="number"
        className="input"
        placeholder="Max"
        value={range.max}
        onChange={(e) => handleChange("max", e.target.value)}
        min="0"
      />
    </div>
  );
};
