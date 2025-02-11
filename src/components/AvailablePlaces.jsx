import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx'
import {sortPlacesByDistance} from '../loc.js'
import {fetchAvailablePlaces} from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);

        }); 

      } catch (error) {
        setError({
          message: error.message || 'could not fetch places, please try againt later!'
        });
      }

    }


    fetchPlaces();
  }, []);

  if (error) {
    return (
      <Error
        title="An error occurred!"
        message={error.message}
      />
    )
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
