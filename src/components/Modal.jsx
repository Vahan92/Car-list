import React, { useReducer } from 'react';
import { useDispatch } from "react-redux";
import { editCarAction } from '../actions/CarActions';
import DatePicker from "react-datepicker";
import styled from "styled-components";

function Form(props) {

  const [carInput, setCarInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: props.info.id,
      brand: props.info.brand,
      model: props.info.model,
      date: props.info.date,
      description: props.info.description,
    }
  );

  const dispatch = useDispatch();  

  const editCar = e => {
    e.preventDefault();    
    dispatch(editCarAction(carInput, props.index))
  }

  const onChangeInfo = (evt) => {

    const name = evt.target.name;
    const newValue = evt.target.value;
    setCarInput({ [name]: newValue});
  };

  const onChangeDate = (date) => {
    setCarInput({ date: date });
  };

  const onChangeBrand = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    const index = evt.target.selectedIndex;
    setCarInput({ [name]: {name: newValue, id: index} });
  };

  return (
    <CarForm  onSubmit={editCar}>
      <div>
        <label htmlFor="brand">Brand</label>
        <select onChange={onChangeBrand} id="brand" name="brand">
          <option selected={props.info.brand.id === 0} value="volvo">Volvo</option>
          <option selected={props.info.brand.id === 1} value="bmw">BMW</option>
          <option selected={props.info.brand.id === 2} value="fiat">Fiat</option>
          <option selected={props.info.brand.id === 3} value="audi">Audi</option>
        </select>
      </div>
      <div>
        <label htmlFor="model">Model</label>
        <input required type="text" onChange={onChangeInfo} id="model" name='model' value={carInput.model} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input required type="text" onChange={onChangeInfo} id="description" name='description' value={carInput.description} />
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
      <button onClick={props.canceleEdit}>Cancel</button>
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