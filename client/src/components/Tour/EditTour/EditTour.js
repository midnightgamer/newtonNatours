import React, { useEffect } from 'react';
import './EditTour.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

import Buttons from '../../../shared/Buttons/Buttons';

const EditTour = (props) => {
   useEffect(() => {
      const input = document.getElementById('searchTextField');
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      window.google.maps.event.addListener(
         autocomplete,
         'place_changed',
         function () {
            var place = autocomplete.getPlace();
            document.getElementById('city2').value = place.name;
            document.getElementById(
               'cityLat'
            ).value = place.geometry.location.lat();
            document.getElementById(
               'cityLng'
            ).value = place.geometry.location.lng();

            console.log(place);
         }
      );
   }, []);
   const options = [
      { label: 'Thing 1', value: 1 },
      { label: 'Thing 2', value: 2 },
   ];
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
                  >
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="hard">Difficult</option>
                  </select>
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="nextDate">
                     Next Date
                  </label>
                  <input
                     className="form__input"
                     id="nextDate"
                     type="Date"
                     required="required"
                  />
               </div>

               <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="guide">
                     Guides
                  </label>
                  <ReactMultiSelectCheckboxes
                     className="form__input"
                     options={options}
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
                     options={options}
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
                  />
               </div>
               <div className="form__group ma-bt-md side-by-side">
                  <label className="form__label" htmlFor="searchTextField">
                     Lat
                  </label>
                  <input
                     className="form__input "
                     id="searchTextField"
                     type="text"
                     placeholder="Delhi,India"
                     required="required"
                  />
                  <input type="hidden" id="city2" name="city2" />
                  <input type="hidden" id="cityLat" name="cityLat" />
                  <input type="hidden" id="cityLng" name="cityLng" />
               </div>
               <div className="form__group">
                  <button type="submit" className="btn btn--green">
                     Update
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditTour;
