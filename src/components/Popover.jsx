import React from 'react';
import { useDispatch } from "react-redux";
import { deleteCar } from '../actions/CarActions';
import styled from "styled-components";

function Popover(props) {

  const dispatch = useDispatch();

    const confirmDelete = () => {
        dispatch(deleteCar(props.id));
       props.canceleDelete();
    }

  return (
    <Text>
     Are you sure you want to delete
     <button onClick={confirmDelete}>Yes</button>
     <button onClick={props.canceleDelete}>No</button>
    </Text>
  );
}

const Text = styled.div`
  max-width: 170px;
  border-radius: 6px;
  background-color: lightgrey;
  position: relative;  
  opacity: 0.9;
`;
export default Popover;