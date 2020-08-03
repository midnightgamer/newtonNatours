export const displayMap = (locations) => {
   mapboxgl.accessToken =
      'pk.eyJ1IjoibWlkbmlnaHRnYW1lciIsImEiOiJja2QxN2ZucGgwY3ZvMnZsNXUxYjIzc3o3In0.rUiiw6JOJ07NfdO74Qfr5Q';
   const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/midnightgamer/ckd17q2co1qeb1ioix5ecf5k2',
      scrollZoom: false,
   });
   const bounds = new mapboxgl.LngLatBounds();

   locations.forEach((loc) => {
      // Create marker
      const el = document.createElement('div');
      el.className = 'marker';

      // Add marker
      new mapboxgl.Marker({
         element: el,
         anchor: 'bottom',
      })
         .setLngLat(loc.coordinates)
         .addTo(map);

      // Add popup
      new mapboxgl.Popup({
         offset: 30,
      })
         .setLngLat(loc.coordinates)
         .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
         .addTo(map);

      // Extend map bounds to include current location
      bounds.extend(loc.coordinates);
   });

   map.fitBounds(bounds, {
      padding: {
         top: 200,
         bottom: 150,
         left: 100,
         right: 100,
      },
   });
};
