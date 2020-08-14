import React, { useEffect, useState } from 'react';
import './CreateTour.css';
import { connect } from 'react-redux';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Buttons from '../../../shared/Buttons/Buttons';
import axiosInstance from '../../../axiosInstance';
import { updateImages, updateTour } from '../../../store/action/tours';

const CreateTour = (props) => {
   const { updateImages, updateTour } = props;
   const [fetchedGudies, setFetchedGudies] = useState(null);
   const [name, setName] = useState('');
   const [summary, setSummary] = useState('');
   const [description, setDescription] = useState('');
   const [duration, setDuration] = useState(5);
   const [maxGroupSize, setMaxGroupSize] = useState(10);
   const [price, setPrice] = useState(497);
   const [difficulty, setDifficulty] = useState('');
   const [startDates, setStartDates] = useState('');
   const [guides, setGuides] = useState([]);
   const [startLocation, setStartLocation] = useState({
      type: 'Point',
      description: '',
      coordinates: [],
   });
   const [locations, setLocations] = useState([
      {
         type: 'Point',
         description: '',
         coordinates: [],
         day: 0,
      },
   ]);
   const [imageCover, setImageCover] = useState(null);
   const [images, setImages] = useState('');

   //Autocomplete for locations
   useEffect(() => {
      const inputs = document.getElementsByClassName('searchTextField');
      for (let el of inputs) {
         const autocomplete = new window.google.maps.places.Autocomplete(el);
         window.google.maps.event.addListener(
            autocomplete,
            'place_changed',
            function () {
               var place = autocomplete.getPlace();
               el.setAttribute('data-lng', `${place.geometry.location.lng()}`);
               el.setAttribute('data-lat', `${place.geometry.location.lat()}`);
            }
         );
      }
   }, [locations]);

   //Fetch All guides
   const fetchGuides = async () => {
      const fetchedGuides = await axiosInstance.get('/users/guides');
      setFetchedGudies(fetchedGuides.data.data.data);
   };
   useEffect(() => {
      fetchGuides();
   }, []);

   //Filter guide and Lead gudie
   const leadgudiesArr = [];
   const gudiesArr = [];
   const filte =
      fetchedGudies &&
      fetchedGudies.map((el) => {
         if (el.role === 'guide') {
            gudiesArr.push({
               label: el.name,
               value: el._id,
            });
         } else {
            leadgudiesArr.push({
               label: el.name,
               value: el._id,
            });
         }
      });

   //Handle input filed values
   const handleDetails = async (e) => {
      const guideIDs = guides.map((e) => {
         if (e.value) {
            return [e.value];
         } else if (e._id) {
            return [e._id];
         }
      });
      e.preventDefault();

      const formData = {
         name,
         description,
         summary,
         price,
         maxGroupSize,
         duration,
         difficulty,
         startDates,
         startLocation,
         locations,
         guides: guideIDs,
      };
      const res = await updateTour(formData);
      /* if (res) {
         setTimeout(() => {
            history.push(`/tour/${tour.slug}`);
         }, 1500);
      }*/
      return res;
   };
   //Handle Images
   const handleImages = async (e, tourId) => {
      const formData = new FormData();
      formData.append('imageCover', imageCover);
      Object.keys(images).forEach(function (key) {
         formData.append('images', images[key]);
      });

      await updateImages(tourId, formData);
   };

   //Creating a new tour
   const updateTourHandler = async (e) => {
      const responseId = await handleDetails(e);
      if (imageCover) {
         await handleImages(e, responseId);
      }
   };

   //Handle location Names
   const locationNameHandler = (e, i) => {
      const { value } = e.target;
      const locationsList = [...locations];
      locationsList[i]['description'] = value;
      delete locationsList._id;
      setLocations(locationsList);
   };
   //Handle location Names
   const locationDayHandler = (e, i) => {
      const { value } = e.target;
      const locationsList = [...locations];
      locationsList[i]['day'] = value;
      delete locationsList._id;
      setLocations(locationsList);
   };

   //Handler location coordinates
   const locationLatLngHandler = (e, i) => {
      const locationsList = [...locations];
      let lat = e.target.dataset.lat;
      let lng = e.target.dataset.lng;
      console.log(locationsList, i);
      lat = Number(lat);
      lng = Number(lng);
      locationsList[i]['coordinates'] = [lng, lat];
      delete locationsList._id;
      setLocations(locationsList);
   };

   //Render number of locations
   const locationArray = () => {
      const maped = [];
      for (let i = 0; i < locations.length; i++) {
         maped.push(
            <div className={`location-${i}`} key={i}>
               <div className="form__group ma-bt-md side-by-side starLocation">
                  <label className="form__label" htmlFor="locations">
                     Location Name
                  </label>
                  <input
                     className="form__input "
                     id="locations"
                     type="text"
                     placeholder="Delhi,India"
                     required="required"
                     value={locations[i].description}
                     onChange={(e) => locationNameHandler(e, i)}
                  />
               </div>
               <div className="form__group ma-bt-md side-by-side">
                  <label className="form__label" htmlFor="locationsSelect">
                     Select Location
                  </label>
                  <input
                     className="form__input searchTextField"
                     id="locationsSelect"
                     type="text"
                     placeholder={locations[i].coordinates}
                     required="required"
                     onBlur={(e) => locationLatLngHandler(e, i)}
                  />
               </div>
               <div className="form__group ma-bt-md side-by-side">
                  <label className="form__label" htmlFor="day">
                     Day
                  </label>
                  <input
                     className="form__input"
                     id="day"
                     type="text"
                     placeholder={locations[i].day}
                     required="required"
                     onChange={(e) => locationDayHandler(e, i)}
                  />
               </div>
            </div>
         );
      }
      return maped;
   };
   return (
      <div className={'main'}>
         <div className="container">
            <h2 className="heading-secondary ma-bt-lg">Create new tour</h2>
            <form className="form">
               <div className="form__group">
                  <label className="form__label" htmlFor="name">
                     Tour Name
                  </label>
                  <input
                     className="form__input"
                     id="name"
                     type="text"
                     placeholder="The Forest Hiker"
                     required="required"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div className="form__group">
                  <label className="form__label" htmlFor="price">
                     Price per person
                  </label>
                  <input
                     className="form__input"
                     id="price"
                     type="text"
                     placeholder="497"
                     required="required"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="summary">
                     Summary
                  </label>
                  <input
                     className="form__input"
                     id="summary"
                     type="text"
                     placeholder="Summary of tour"
                     required="required"
                     value={summary}
                     onChange={(e) => setSummary(e.target.value)}
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="description">
                     Description
                  </label>
                  <textarea
                     className="form__input"
                     id="description"
                     placeholder="Description of tour"
                     required="required"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="duration">
                     Duration (In Days)
                  </label>
                  <input
                     className="form__input"
                     id="duration"
                     type="number"
                     placeholder="10"
                     required="required"
                     value={duration}
                     onChange={(e) => setDuration(e.target.value)}
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="maxGroupSize">
                     Maximum Group Size
                  </label>
                  <input
                     className="form__input"
                     id="maxGroupSize"
                     type="number"
                     value={maxGroupSize}
                     placeholder="15"
                     onChange={(e) => setMaxGroupSize(e.target.value)}
                     required="required"
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="difficulty">
                     Difficulty
                  </label>
                  <select
                     className="form__input"
                     id="difficulty"
                     required="required"
                     value={difficulty}
                     onChange={(e) => setDifficulty(e.target.value)}
                  >
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="difficult">Difficult</option>
                  </select>
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="nextDate">
                     Start Date
                  </label>
                  <input
                     className="form__input"
                     id="nextDate"
                     type="Date"
                     required="required"
                     onChange={(e) => setStartDates(e.target.value)}
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="guide">
                     Guides
                  </label>
                  <ReactMultiSelectCheckboxes
                     className="form__input"
                     options={gudiesArr}
                     onChange={(option) => setGuides((guides[0] = option))}
                     width={'100%'}
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="lead-guide">
                     Lead Guides
                  </label>
                  <ReactMultiSelectCheckboxes
                     id="lead-guide"
                     className="form__input"
                     options={leadgudiesArr}
                     onChange={(option) => setGuides([...guides, ...option])}
                     width={'100%'}
                  />
               </div>

               <div className="form__group ma-bt-md side-by-side starLocation">
                  <label className="form__label" htmlFor="startLocation">
                     Start Location
                  </label>
                  <input
                     className="form__input "
                     id="startLocation"
                     type="text"
                     placeholder="Delhi,India"
                     required="required"
                     value={startLocation.description}
                     onChange={(e) =>
                        setStartLocation({
                           ...startLocation,
                           description: e.target.value,
                        })
                     }
                  />
               </div>
               <div className="form__group ma-bt-md side-by-side">
                  <label className="form__label" htmlFor="searchTextField">
                     Select Place
                  </label>
                  <input
                     className="form__input searchTextField"
                     id="searchTextField"
                     type="text"
                     placeholder="Taj Mahal"
                     required="required"
                     value={startLocation.coordinates}
                     onBlur={(e) =>
                        setStartLocation({
                           ...startLocation,
                           coordinates: [
                              e.target.dataset.lat,
                              e.target.dataset.lng,
                           ],
                        })
                     }
                  />
               </div>

               <div id="locationArray" style={{ marginBottom: 20 + 'px' }}>
                  {locationArray()}
                  <Buttons
                     to={`/tour/createTour`}
                     type={'text'}
                     onClick={() =>
                        setLocations([
                           ...locations,
                           {
                              type: 'Point',
                              description: '',
                              coordinates: [],
                           },
                        ])
                     }
                  >
                     + Add more locations
                  </Buttons>
               </div>

               <div className="form__group ">
                  <label className="form__label" htmlFor="searchTextField">
                     Select Cover Image for tour
                  </label>
                  <input
                     className="form__upload"
                     type="file"
                     accept="image/*"
                     id="photo"
                     onChange={(e) => setImageCover(e.target.files[0])}
                     name="photo"
                  />
                  <label htmlFor="photo">Choose new photo</label>
               </div>

               <div className="form__group ">
                  <label className="form__label" htmlFor="picture">
                     Select location images (Minimum 3)
                  </label>
                  <input
                     className="form__upload"
                     type="file"
                     multiple
                     accept="image/*"
                     id="picture"
                     onChange={(e) => setImages(e.target.files)}
                     // onChange={(e) => onFileChange(e)}
                     name="pictures"
                  />
                  <label htmlFor="picture">Choose new photo</label>
               </div>
               <div className="form__group">
                  <button
                     type="submit"
                     className="btn btn--green"
                     onClick={(e) => updateTourHandler(e)}
                  >
                     Create Tour
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

const mapStateToProps = (state) => ({
   tour: state.tours.tour,
});
export default connect(mapStateToProps, {
   updateImages,
   updateTour,
})(CreateTour);
