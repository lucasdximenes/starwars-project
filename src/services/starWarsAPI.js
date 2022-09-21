const fetchPlanets = async () => {
  const URL = 'https://swapi.dev/api/planets/';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchPlanets;
