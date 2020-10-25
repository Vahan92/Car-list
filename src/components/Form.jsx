import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCar } from '../actions/CarActions';
import DatePicker from "react-datepicker";
import styled from "styled-components";

function Form() {

  const [carInput, setCarInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: null,
      brand: {name: "Volvo", id: 0},
      model: '',
      date: null,
      description: '',
    }
  );

  const dispatch = useDispatch();  

  const registerCar = e => {
    e.preventDefault();    
    dispatch(addCar(carInput))
  }

  const onChangeInfo = (evt) => {

    const name = evt.target.name;
    const newValue = evt.target.value;
    setCarInput({ [name]: newValue, id: Math.random() * Math.random()});
  };

  const onChangeDate = (date) => {
    setCarInput({ date: date, id: Math.random() * Math.random() });
  };

  const onChangeBrand = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    const index = evt.target.selectedIndex;
    setCarInput({ [name]: {name: newValue, id: index}, id: Math.random() * Math.random() });
  };

  return (
    <CarForm  onSubmit={registerCar}>
      <div>
        <label htmlFor="brand">Brand</label>
        <select onChange={onChangeBrand} id="brand" name="brand">
          <option value="volvo">Volvo</option>
          <option value="bmw">BMW</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
      <div>
        <label htmlFor="model">Model</label>
        <input required type="text" onChange={onChangeInfo} id="model" name='model' />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input required type="text" onChange={onChangeInfo} id="description" name='description' />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <DatePicker
          selected={carInput.date}
          onChange={onChangeDate}
          id='date'
          required
        />
      </div>
      <button type="submit" >Save</button>
    </CarForm>
  );
}

const CarForm = styled.form`
  max-width: 400px;
  border-radius: 6px;
  > div {
    margin: 10px 6px;
  }
  input {
    width: 100%;
  }
  select {
    width: 100%;
    height: 32px;
  }
  label {
    margin: 0 10px 0 0;
  }
`;
export default Form;