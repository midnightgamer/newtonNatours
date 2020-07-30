import React, { Fragment } from 'react';
import './Tour.css';
const Tour = (props) => (
   <Fragment>
      <section className="section-header">
         <div className="heading-box">
            <h1 className="heading-primary">
               <span>
                  The Park <br />
                  Camper Tour
               </span>
            </h1>
            <div className="heading-box__group">
               <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                     <use xlinkHref="img/icons.svg#icon-clock" />
                  </svg>
                  <span className="heading-box__text">10 days</span>
               </div>
               <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                     <use xlinkHref="img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span className="heading-box__text">Las Vegas, USA</span>
               </div>
            </div>
         </div>
      </section>

      <section className="section-description">
         <div className="overview-box">
            <div>
               <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                  <div className="overview-box__detail">
                     <svg className="overview-box__icon">
                        <use xlinkHref="img/icons.svg#icon-calendar"></use>
                     </svg>
                     <span className="overview-box__label">Next date</span>
                     <span className="overview-box__text">August 2021</span>
                  </div>
                  <div className="overview-box__detail">
                     <svg className="overview-box__icon">
                        <use xlinkHref="img/icons.svg#icon-trending-up"></use>
                     </svg>
                     <span className="overview-box__label">Difficulty</span>
                     <span className="overview-box__text">Medium</span>
                  </div>
                  <div className="overview-box__detail">
                     <svg className="overview-box__icon">
                        <use xlinkHref="img/icons.svg#icon-user"></use>
                     </svg>
                     <span className="overview-box__label">Participants</span>
                     <span className="overview-box__text">10 people</span>
                  </div>
                  <div className="overview-box__detail">
                     <svg className="overview-box__icon">
                        <use xlinkHref="img/icons.svg#icon-star"></use>
                     </svg>
                     <span className="overview-box__label">Rating</span>
                     <span className="overview-box__text">4.9 / 5</span>
                  </div>
               </div>

               <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">
                     Your tour guides
                  </h2>

                  <div className="overview-box__detail">
                     <img
                        src="img/users/user-19.jpg"
                        alt="Lead guide"
                        className="overview-box__img"
                     />
                     <span className="overview-box__label">Lead guide</span>
                     <span className="overview-box__text">Steven Miller</span>
                  </div>
                  <div className="overview-box__detail">
                     <img
                        src="img/users/user-18.jpg"
                        alt="Tour guide"
                        className="overview-box__img"
                     />
                     <span className="overview-box__label">Tour guide</span>
                     <span className="overview-box__text">Lisa Brown</span>
                  </div>
                  <div className="overview-box__detail">
                     <img
                        src="img/users/user-17.jpg"
                        alt="Intern"
                        className="overview-box__img"
                     />
                     <span className="overview-box__label">Intern</span>
                     <span className="overview-box__text">Max Smith</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">
               About the park camper tour
            </h2>
            <p className="description__text">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
               enim ad minim veniam, quis nostrud exercitation ullamco laboris
               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
               reprehenderit in voluptate velit esse cillum dolore eu fugiat
               nulla pariatur.
            </p>
            <p className="description__text">
               Duis aute irure dolor in reprehenderit in voluptate velit esse
               cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
               cupidatat non proident, sunt in culpa qui officia deserunt mollit
               anim id est laborum!
            </p>
         </div>
      </section>

      <section className="section-pictures">
         <div className="picture-box">
            <img
               className="picture-box__img picture-box__img--1"
               src="img/tour-5-1.jpg"
               alt="The Park Camper Tour 1"
            />
         </div>
         <div className="picture-box">
            <img
               className="picture-box__img picture-box__img--2"
               src="img/tour-5-2.jpg"
               alt="The Park Camper Tour 1"
            />
         </div>
         <div className="picture-box">
            <img
               className="picture-box__img picture-box__img--3"
               src="img/tour-5-3.jpg"
               alt="The Park Camper Tour 1"
            />
         </div>
      </section>

      <section className="section-map">
         <div id="map"></div>
         {/* <script>
                mapboxgl.accessToken =
                'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

                const geojson = {
                type: 'FeatureCollection',
                features: [
            {
                type: 'Feature',
                geometry: {
                type: 'Point',
                coordinates: [-112.987418, 37.198125]
            },
                properties: {
                description: 'Zion Canyon National Park'
            }
            },
            {
                type: 'Feature',
                geometry: {
                type: 'Point',
                coordinates: [-111.376161, 36.86438]
            },
                properties: {
                description: 'Antelope Canyon'
            }
            },
            {
                type: 'Feature',
                geometry: {
                type: 'Point',
                coordinates: [-112.115763, 36.058973]
            },
                properties: {
                description: 'Grand Canyon National Park'
            }
            },
            {
                type: 'Feature',
                geometry: {
                type: 'Point',
                coordinates: [-116.107963, 34.011646]
            },
                properties: {
                description: 'Joshua Tree National Park'
            }
            }
                ]
            };

                const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h',
                scrollZoom: false
            });

                const bounds = new mapboxgl.LngLatBounds();

                geojson.features.forEach(function(marker) {
                var el = document.createElement('div');
                el.className = 'marker';

                new mapboxgl.Marker({
                element: el,
                anchor: 'bottom'
            })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);

                new mapboxgl.Popup({
                offset: 30,
                closeOnClick: false
            })
                .setLngLat(marker.geometry.coordinates)
                .setHTML('<p>' + marker.properties.description + '</p>')
                .addTo(map);

                bounds.extend(marker.geometry.coordinates);
            });

                map.fitBounds(bounds, {
                padding: {
                top: 200,
                bottom: 150,
                left: 50,
                right: 50
            }
            });

                map.on('load', function() {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: [
                                    [-112.987418, 37.198125],
                                    [-111.376161, 36.86438],
                                    [-112.115763, 36.058973],
                                    [-116.107963, 34.011646]
                                ]
                            }
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#55c57a',
                        'line-opacity': 0.6,
                        'line-width': 3
                    }
                });
            });
            </script>*/}
      </section>

      <section className="section-reviews">
         <div className="reviews">
            <div className="reviews__card">
               <div className="reviews__avatar">
                  <img
                     src="img/users/user-7.jpg"
                     alt="Jim Brown"
                     className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Jim Brown</h6>
               </div>
               <p className="reviews__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque dignissimos sint quo commodi corrupti accusantium
                  veniam saepe numquam.
               </p>
               <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
               </div>
            </div>

            <div className="reviews__card">
               <div className="reviews__avatar">
                  <img
                     src="img/users/user-14.jpg"
                     alt="Laura Wilson"
                     className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Laura Wilson</h6>
               </div>
               <p className="reviews__text">
                  Veniam adipisci blanditiis, corporis sit magnam aperiam ad,
                  fuga reiciendis provident deleniti cumque similique itaque
                  animi, sapiente obcaecati beatae accusantium.
               </p>
               <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--inactive">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
               </div>
            </div>

            <div className="reviews__card">
               <div className="reviews__avatar">
                  <img
                     src="img/users/user-15.jpg"
                     alt="Ben Hadley"
                     className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Ben Hadley</h6>
               </div>
               <p className="reviews__text">
                  Debitis, nesciunt itaque! At quis officia natus. Suscipit,
                  reprehenderit blanditiis mollitia distinctio ducimus porro
                  tempore perspiciatis sunt vel.
               </p>
               <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
               </div>
            </div>

            <div className="reviews__card">
               <div className="reviews__avatar">
                  <img
                     src="img/users/user-6.jpg"
                     alt="Alexander Jones"
                     className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Alexander Jones</h6>
               </div>
               <p className="reviews__text">
                  Quaerat laborum eveniet ut aut maiores doloribus mollitia
                  aperiam quis praesentium sed inventore harum aliquam veritatis
                  at adipisci ea assumenda!
               </p>
               <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
               </div>
            </div>

            <div className="reviews__card">
               <div className="reviews__avatar">
                  <img
                     src="img/users/user-3.jpg"
                     alt="Ayla Cornell"
                     className="reviews__avatar-img"
                  />
                  <h6 className="reviews__user">Ayla Cornell</h6>
               </div>
               <p className="reviews__text">
                  Perferendis quo aliquid iste quas laboriosam molestias illo
                  est voluptatem odit ea. Vero placeat culpa provident dicta
                  maiores!
               </p>
               <div className="reviews__rating">
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
                  <svg className="reviews__star reviews__star--active">
                     <use xlinkHref="img/icons.svg#icon-star"></use>
                  </svg>
               </div>
            </div>
         </div>
      </section>

      <section className="section-cta">
         <div className="cta">
            <div className="cta__img cta__img--logo">
               <img src="img/logo-white.png" alt="Natours logo" className="" />
            </div>
            <img
               src="img/tour-5-2.jpg"
               alt=""
               className="cta__img cta__img--1"
            />
            <img
               src="img/tour-5-1.jpg"
               alt=""
               className="cta__img cta__img--2"
            />

            <div className="cta__content">
               <h2 className="heading-secondary">What are you waiting for?</h2>
               <p className="cta__text">
                  10 days. 1 adventure. Infinite memories. Make it yours today!
               </p>
               <button className="btn btn--green span-all-rows">
                  Book tour now!
               </button>
            </div>
         </div>
      </section>
   </Fragment>
);

export default Tour;
