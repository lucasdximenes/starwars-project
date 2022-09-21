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
    <div>
      <label htmlFor="order">
        Ordenar por:
        <select
          name="column"
          id="order"
          data-testid="column-sort"
          value={ column }
          onChange={ handleOrder }
        >
          {COLUMNS.map((col) => (
            <option key={ col } value={ col }>
              {col}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="asc">
        <input
          type="radio"
          name="sort"
          id="asc"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ handleOrder }
        />
        Ascendente
      </label>

      <label htmlFor="desc">
        <input
          type="radio"
          name="sort"
          id="desc"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleOrder }
        />
        Descendente
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
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
