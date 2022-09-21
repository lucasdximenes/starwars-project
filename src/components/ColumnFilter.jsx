/* eslint-disable max-len */
import React from 'react';
import propTypes from 'prop-types';
import { COLUMNS, MAX_SELECTED_FILTERS } from '../helpers/constants';

function ColumnFilter({
  numericFilters,
  handleNumericFilter,
  addNumericFilter,
  selectedFilters,
  removeAllFilters,
  removeFilter,
  filters,
}) {
  return (
    <div>
      <div className="flex flex-col items-center gap-3 mb-4">
        <button
          type="button"
          data-testid="button-remove-filters"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={ removeAllFilters }
          disabled={ !selectedFilters.length }
        >
          Remover todos os filtros
        </button>

        {filters.filterByNumericValues.map((filter, index) => (
          <div key={ index }>
            <span data-testid="filter" className="text-white font-bold text-lg">
              {`${filter.column} ${filter.comparison} ${filter.value} `}
              <button
                type="button"
                onClick={ () => removeFilter(filter.column) }
                className="bg-red-500 hover:bg-red-700 text-white font-bold rounded cursor-pointer px-3 py-1"
              >
                X
              </button>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start gap-3 lg:flex-row lg:justify-around lg:items-center">
        <label htmlFor="column-filter" className="text-lg font-bold text-white">
          Filtrar por coluna:
          {' '}
          <select
            name="column"
            id="column-filter"
            data-testid="column-filter"
            className="border-2 border-gray-400 rounded-md p-2 text-black"
            onChange={ handleNumericFilter }
            value={ numericFilters.column }
          >
            {COLUMNS.filter((filter) => !selectedFilters.includes(filter)).map(
              (filter) => (
                <option key={ filter } value={ filter }>
                  {filter}
                </option>
              ),
            )}
          </select>
        </label>
        <label
          htmlFor="comparison-filter"
          className="text-lg font-bold text-white"
        >
          Comparação:
          {' '}
          <select
            name="comparison"
            id="comparison-filter"
            data-testid="comparison-filter"
            className="border-2 border-gray-400 rounded-md p-2 text-black"
            onChange={ handleNumericFilter }
            value={ numericFilters.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter" className="text-lg font-bold text-white">
          Valor:
          {' '}
          <input
            type="number"
            name="value"
            id="value-filter"
            data-testid="value-filter"
            className="border-2 border-gray-400 rounded-md p-2 text-black"
            onChange={ handleNumericFilter }
            value={ numericFilters.value }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer self-center"
          onClick={ addNumericFilter }
          disabled={ selectedFilters.length === MAX_SELECTED_FILTERS }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

ColumnFilter.propTypes = {
  numericFilters: propTypes.shape({
    column: propTypes.string,
    comparison: propTypes.string,
    value: propTypes.string,
  }).isRequired,
  handleNumericFilter: propTypes.func.isRequired,
  addNumericFilter: propTypes.func.isRequired,
  selectedFilters: propTypes.arrayOf(propTypes.string).isRequired,
  removeAllFilters: propTypes.func.isRequired,
  removeFilter: propTypes.func.isRequired,
  filters: propTypes.shape({
    filterByName: propTypes.shape({
      name: propTypes.string,
    }),
    filterByNumericValues: propTypes.arrayOf(
      propTypes.shape({
        column: propTypes.string,
        comparison: propTypes.string,
        value: propTypes.string,
      }),
    ),
  }).isRequired,
};

export default ColumnFilter;
