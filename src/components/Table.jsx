/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react';
import Filters from './Filters';
import StarWarsContext from '../context/starWarsContext';

export default function Table() {
  const { planets, tableHeaders } = useContext(StarWarsContext);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const BeautyTableHeader = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-gray-800 p-4 bg-gray-300">
        StarWars project
      </h1>

      <Filters planets={ planets } setFilteredPlanets={ setFilteredPlanets } />

      <div className="overflow-x-auto w-full">
        <table className="mx-auto max-w-4xl w-full whitespace-nowrap bg-white divide-y divide-gray-300 overflow-hidden">
          <thead className="bg-black">
            <tr className="text-white text-left">
              {BeautyTableHeader.map((header) => (
                <th
                  key={ header }
                  className="font-semibold text-sm uppercase px-6 py-4"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-900 text-white">
            {filteredPlanets.map((planet) => (
              <tr key={ planet.name }>
                {tableHeaders.map((header) => {
                  if (header === 'name') {
                    return (
                      <td
                        key={ header }
                        data-testid="planet-name"
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {planet[header]}
                      </td>
                    );
                  }
                  return (
                    <td key={ header } className="px-6 py-4 whitespace-nowrap">
                      {planet[header]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
