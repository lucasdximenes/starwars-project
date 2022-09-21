/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { COLUMNS } from '../helpers/constants';

function OrderFilter({ setOrder }) {
  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const handleOrder = ({ target: { value, name } }) => {
    if (name === 'column') {
      setColumn(value);
    } else {
      setSort(value);
    }
  };

  const handleClick = () => {
    setOrder({ column, sort });
  };

  return (
    <div className="flex flex-col items-start gap-2 lg:flex-row lg:justify-around lg:items-center lg:w-1/2 mb-4">
      <label htmlFor="order" className="text-lg font-bold text-white">
        Ordenar por:
      </label>
      <select
        name="column"
        id="order"
        data-testid="column-sort"
        value={ column }
        onChange={ handleOrder }
        className="border-2 border-gray-400 rounded-md p-2 text-black"
      >
        {COLUMNS.map((col) => (
          <option key={ col } value={ col }>
            {col}
          </option>
        ))}
      </select>

      <label htmlFor="asc" className="text-lg font-bold text-white">
        <input
          type="radio"
          name="sort"
          id="asc"
          value="ASC"
          data-testid="column-sort-input-asc"
          className="mr-2"
          onChange={ handleOrder }
        />
        Ascendente
      </label>

      <label htmlFor="desc" className="text-lg font-bold text-white">
        <input
          type="radio"
          name="sort"
          id="desc"
          value="DESC"
          data-testid="column-sort-input-desc"
          className="mr-2"
          onChange={ handleOrder }
        />
        Descendente
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        className="bg-blue-600 text-black rounded-md p-2 font-bold hover:bg-blue-700 transition-colors self-center"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
}

OrderFilter.propTypes = {
  setOrder: propTypes.func.isRequired,
};

export default OrderFilter;
