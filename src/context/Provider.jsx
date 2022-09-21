import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import StarWarsContext from './starWarsContext';
import fetchPlanets from '../services/starWarsAPI';

function Provider({ children }) {
  const [table, setTable] = useState({
    planets: [],
    tableHeaders: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanets();
      const newArr = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setTable({
        planets: newArr,
        tableHeaders: Object.keys(newArr[0]),
      });
    };
    getPlanets();
  }, []);

  const context = {
    ...table,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
