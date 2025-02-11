export default function Places({ title, places, fallbackText, onSelectPlace, isLoading }) {
  console.log(places);

  function loader() {
    return (
      <section className="places-category">
        <ul className="places">
          {[...Array(4)].map((_, index) => (
            <li key={index} className="place-item mb-4 rounded-md">
              <div className="animate-pulse rounded-md">
                <div className="bg-gray-300 h-40 w-full mb-2 rounded-md"></div>
                <div className="bg-gray-300 h-6 w-2/3 rounded-md"></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }


  return (
    <>
      <section className="places-category">
        <h2>{title}</h2>

        {isLoading && loader()}
        {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
        {places.length > 0 && (
          <ul className="places">
            {places.map((place) => (
              <li key={place.id} className="place-item">
                <button onClick={() => onSelectPlace(place)}>
                  <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                  <h3 className="text-black">{place.title}</h3>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
