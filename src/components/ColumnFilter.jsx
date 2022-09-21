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
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
          disabled={ !selectedFilters.length }
        >
          Remover todos os filtros
        </button>
        {filters.filterByNumericValues.map((filter, index) => (
          <div key={ index }>
            <span data-testid="filter">
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button type="button" onClick={ () => removeFilter(filter.column) }>
                X
              </button>
            </span>
          </div>
        ))}
      </div>
      <label htmlFor="column-filter">
        Filtrar por coluna:
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
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
      <label htmlFor="comparison-filter">
        Comparação:
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ handleNumericFilter }
          value={ numericFilters.comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          type="number"
          name="value"
          id="value-filter"
          data-testid="value-filter"
          onChange={ handleNumericFilter }
          value={ numericFilters.value }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addNumericFilter }
        disabled={ selectedFilters.length === MAX_SELECTED_FILTERS }
      >
        Filtrar
      </button>
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
