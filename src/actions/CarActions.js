import { FETCH_CARS, SUCCESSFULY_REGISTERED, DELETE, EDIT } from './types';
import axios from "axios";
import data from '../data/Cars.json';

export const fetchCars = () => dispatch => {
  fetch(`../data/Cars.json`)
    .then(res => { res.json() })
    .then(cars =>
      console.log(`cars `, cars)
      // dispatch({
      //   type: FETCH_CARS,
      //   payload: cars
      // })
    );
  // fetch('posts.json')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

export const addCar = postData => dispatch => {
  dispatch({
    type: SUCCESSFULY_REGISTERED,
    payload: postData
  })
}

export const deleteCar = postData => dispatch => {
  dispatch({
    type: DELETE,
    payload: postData
  })
}

export const editCarAction = (postData, index) => dispatch => {
  dispatch({
    type: EDIT,
    payload: postData, 
    index
  })
}
