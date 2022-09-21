import React, { useContext, useState, useEffect } from 'react';
import Filters from './Filters';
import StarWarsContext from '../context/starWarsContext';

export default function Table() {
  const { planets, tableHeaders } = useContext(StarWarsContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  return (
    <div>
      <Filters planets={ planets } setFilteredPlanets={ setFilteredPlanets } />

      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              {tableHeaders.map((header) => {
                if (header === 'name') {
                  return (
                    <td key={ header } data-testid="planet-name">
                      {planet[header]}
                    </td>
                  );
                }
                return <td key={ header }>{planet[header]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
