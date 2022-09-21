import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import OrderFilter from './OrderFilter';
import ColumnFilter from './ColumnFilter';

function Filters({ planets, setFilteredPlanets }) {
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [order, setOrder] = useState({
    column: 'population',
    sort: '',
  });

  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const handleNumericFilter = ({ target: { value, name } }) => {
    setNumericFilters({
      ...numericFilters,
      [name]: value,
    });
  };

  const addNumericFilter = () => {
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: [...prev.filterByNumericValues, numericFilters],
    }));
    setSelectedFilters((prev) => [...prev, numericFilters.column]);
  };

  const removeFilter = (column) => {
    setFilters((prev) => ({
      ...prev,
      filterByNumericValues: prev.filterByNumericValues.filter(
        (filter) => filter.column !== column,
      ),
    }));
    setSelectedFilters((prev) => prev.filter((filter) => filter !== column));
  };

  const removeAllFilters = () => {
    setFilters({
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    });
    setSelectedFilters([]);
  };

  useEffect(() => {
    const columns = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];

    setNumericFilters((prev) => ({
      ...prev,
      column: columns.filter((filter) => !selectedFilters.includes(filter))[0],
    }));
  }, [selectedFilters]);

  useEffect(() => {
    const filterBySearch = (arr) => {
      const {
        filterByName: { name },
      } = filters;
      const filter = name.toLowerCase().trim();
      const filtered = arr.filter((p) => p.name.toLowerCase().includes(filter));
      return filtered;
    };

    const filterByNumericValues = (arr) => {
      const { filterByNumericValues: filterNumeric } = filters;
      let filtered = [...arr];
      filterNumeric.forEach((filter) => {
        const { column, comparison, value } = filter;
        filtered = filtered.filter((p) => {
          switch (comparison) {
          case 'maior que':
            return Number(p[column]) > Number(value);
          case 'menor que':
            return Number(p[column]) < Number(value);
          case 'igual a':
            return Number(p[column]) === Number(value);
          default:
            return p;
          }
        });
      });
      return filtered;
    };

    const sortFunction = (a, b) => {
      const SORT_FACTOR = -1;
      const { column, sort } = order;
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return SORT_FACTOR;
      if (sort === 'ASC') {
        return Number(a[column]) > Number(b[column]) ? 1 : SORT_FACTOR;
      }
      return Number(a[column]) < Number(b[column]) ? 1 : SORT_FACTOR;
    };
    const sortPlanets = (arr) => {
      const sorted = [...arr].sort(sortFunction);
      return sorted;
    };

    let filtered = [...planets];
    filtered = filterBySearch(filtered);
    filtered = filterByNumericValues(filtered);
    filtered = sortPlanets(filtered);
    setFilteredPlanets(filtered);
  }, [filters, planets, setFilteredPlanets, order]);

  return (
    <div>
      <label htmlFor="name-filter">
        Filtrar por nome:
        <input
          type="text"
          name="name-filter"
          id="name-filter"
          data-testid="name-filter"
          value={ filters.filterByName.name }
          onChange={ handleSearch }
        />
      </label>

      <OrderFilter setOrder={ setOrder } />

      <ColumnFilter
        numericFilters={ numericFilters }
        handleNumericFilter={ handleNumericFilter }
        addNumericFilter={ addNumericFilter }
        selectedFilters={ selectedFilters }
        removeAllFilters={ removeAllFilters }
        removeFilter={ removeFilter }
        filters={ filters }
      />
    </div>
  );
}

Filters.propTypes = {
  planets: propTypes.arrayOf(propTypes.shape({})).isRequired,
  setFilteredPlanets: propTypes.func.isRequired,
};

export default Filters;
