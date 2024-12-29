import React from 'react';
import { useDataGrid } from '..';

const DataGridTableHeadRowsSelect = ({ selectLabel }: { selectLabel?: string }) => {
  const { isSelectAllChecked, isSelectAllIndeterminate, toggleAllRowsSelection } = useDataGrid();

  return (
    <th className="table-cell-center ">
      {selectLabel ? <div className='flex  items-center'>
        <span className='mr-2'>{selectLabel}</span>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={isSelectAllChecked}
          ref={(input) => {
            if (input) {
              input.indeterminate = isSelectAllIndeterminate;
            }
          }}
          onChange={(e) => {
            const { checked } = e.target; // Correctly capture the checked value
            toggleAllRowsSelection(checked);
          }}
        />
      </div> : <>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={isSelectAllChecked}
          ref={(input) => {
            if (input) {
              input.indeterminate = isSelectAllIndeterminate;
            }
          }}
          onChange={(e) => {
            const { checked } = e.target; // Correctly capture the checked value
            toggleAllRowsSelection(checked);
          }}
        />
      </>}

    </th>
  );
};

export { DataGridTableHeadRowsSelect };
