import mapboxgl from 'mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom';

mapboxgl.accessToken =
   'pk.eyJ1IjoibWlkbmlnaHRnYW1lciIsImEiOiJja2QxN2ZucGgwY3ZvMnZsNXUxYjIzc3o3In0.rUiiw6JOJ07NfdO74Qfr5Q';

class Application extends React.Component {
   // Code from the next few steps will go here
   constructor(props) {
      super(props);
      this.state = {
         lng: 5,
         lat: 34,
         zoom: 2,
      };
   }
   componentDidMount() {
      const map = new mapboxgl.Map({
         container: this.mapContainer,
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [this.state.lng, this.state.lat],
         zoom: this.state.zoom,
      });
   }
   render() {
      return (
         <div>
            <div ref={(el) => (this.mapContainer = el)} />
         </div>
      );
   }
}

ReactDOM.render(<Application />, document.getElementById('root'));
