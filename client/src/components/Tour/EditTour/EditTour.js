import React, { useEffect, useState } from 'react';
import './EditTour.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Buttons from '../../../shared/Buttons/Buttons';
import axiosInstance from '../../../axiosInstance';

const EditTour = (props) => {
   const [inputLocationItem, setInputLocationItem] = useState([1]);
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
   const [locations, setLocations] = useState([]);
   const [imageCover, setImageCover] = useState('');
   const [images, setImages] = useState('');

   useEffect(() => {
      const inputs = document.getElementsByClassName('searchTextField');
      for (let el of inputs) {
         const autocomplete = new window.google.maps.places.Autocomplete(el);
         window.google.maps.event.addListener(
            autocomplete,
            'place_changed',
            function () {
               var place = autocomplete.getPlace();
               /*    document.getElementById('city2').value = place.name;
               document.getElementById(
                  'cityLat'
               ).value = place.geometry.location.lat();
               document.getElementById(
                  'cityLng'
               ).value = place.geometry.location.lng();*/
               el.setAttribute('data-lng', `${place.geometry.location.lng()}`);
               el.setAttribute('data-lat', `${place.geometry.location.lat()}`);
            }
         );
      }
   }, [inputLocationItem]);
   const fetchGuides = async () => {
      const fetchedGuides = await axiosInstance.get('/users/guides');
      setFetchedGudies(fetchedGuides.data.data.data);
   };

   useEffect(() => {
      fetchGuides();
   }, []);
   const leadgudiesArr = [];
   const gudiesArr = [];
   const filte =
      fetchedGudies &&
      fetchedGudies.map((el) => {
         if (el.role === 'guide') {
            gudiesArr.push({ label: el.name, value: el._id });
         } else {
            leadgudiesArr.push({ label: el.name, value: el._id });
         }
      });

   const handleDetails = async (e) => {
      const guideIDs = guides.map((e) => {
         return [e.value];
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
      const res = await axiosInstance.post('/tours', formData);
      console.log(res.data.data.data._id);
      return res.data.data.data.id;
   };

   const handleImages = async (e, tourId) => {
      const formData = new FormData();
      formData.append('imageCover', imageCover);

      Object.keys(images).forEach(function (key) {
         formData.append('images', images[key]);
      });
      await axiosInstance.patch(`/tours/${tourId}`, formData);
   };
   const creatTour = async (e) => {
      const responseId = await handleDetails(e);
      await handleImages(e, responseId);
   };
   const locationNameHandler = (e, i) => {
      const location = {
         type: 'Point',
         description: e.target.value,
         coordinates: [],
      };
      const oldLocations = locations;
      oldLocations[i] = location;
      setLocations(oldLocations);
   };
   const locationLatLngHandler = (e, i) => {
      const oldLocations = locations;
      let lat = e.target.dataset.lat;
      let lng = e.target.dataset.lng;
      lat = Number(lat);
      lng = Number(lng);
      const location = {
         ...oldLocations[i],
         coordinates: [lat, lng],
      };
      oldLocations[i] = location;
      setLocations(oldLocations);
   };
   const locationArray = () => {
      const maped = inputLocationItem.map((el, i) => {
         return (
            <div className={`location-${i}`}>
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
                     placeholder="Taj Mahal"
                     required="required"
                     onBlur={(e) => locationLatLngHandler(e, i)}
                  />
               </div>
            </div>
         );
      });
      return maped;
   };
   return (
      <div className={'main'}>
         <div className="container">
            <h2 className="heading-secondary ma-bt-lg">Edit Forest Hiker</h2>
            <form className="form">
               <div className="form__group">
                  <label className="form__label" htmlFor="name">
                     Tour Name
                  </label>
                  <input
                     className="form__input"
                     id="name"
                     type="name"
                     placeholder="The Forest Hiker"
                     required="required"
                     onChange={(e) => setName(e.target.value)}
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
                     onChange={(e) => setDifficulty(e.target.value)}
                  >
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="hard">Difficult</option>
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
                     to={'/editTour'}
                     type={'text'}
                     onClick={() =>
                        setInputLocationItem([...inputLocationItem, 2])
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
                     onClick={(e) => creatTour(e)}
                  >
                     Update
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditTour;
