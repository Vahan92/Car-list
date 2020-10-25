import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from '../actions/CarActions';
import styled from "styled-components";

import CarForm from './Form';
import Popover from './Popover';
import Modal from './Modal';


function Cars() {
  const [editModal, showEditmodal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [edit, setEdit] = useState({});
  const [editIndex, setEditIndex] = useState(null);


  const dispatch = useDispatch();
  const results = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const deleteCar = (id) => {
    setDeleteModal(true);
    setSelectedCarId(id);
  }

  const canceleDelete = () => {
    setDeleteModal(false);
  }

  const canceleEdit = () => {
    showEditmodal(false);
  }

  const edirCar = (el, index) => {
    setEdit(el);
    setEditIndex(index)
    showEditmodal(true)
  }

  return (
    <Container>
      <h1>Cars List</h1>
      <CarForm />
      {editModal && <Modal canceleEdit={canceleEdit} index={editIndex} info={edit}/>}
      {results.carsReducer.loading ? (
        "Loading..."
      ) : results.carsReducer.cars.length ? (
        <>
          <table>
            <thead>
              <tr>
                {Object.keys(results.carsReducer.cars[0]).filter(el => el !== "id").map(el => (
                  <th key={el}>{el}</th>
                ))}
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {results.carsReducer.cars.map((el, index) => {
                return <tr key={el.id * Math.random()}>
                  <td>{el.brand.name}</td>
                  <td>{el.model}</td>
                  <td>{el.date.toDateString()}</td>
                  <td>{el.description}</td>
                  <td className='actions'>
                    <img src="https://e7.pngegg.com/pngimages/493/715/png-clipart-pencil-computer-icons-pencil-crayons-text-logo.png" alt="pencil" onClick={() => edirCar(el, index)}/>
                    <img src="https://img.pngio.com/trash-can-png-logo-trash-can-png-icon-125916-free-cliparts-on-trash-icon-png-920_1060.png" alt="trash" onClick={() => deleteCar(el.id)} />
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </>
      ) : <h5>Ther are not any cars to be shown</h5>}
      {deleteModal && <Popover id={selectedCarId} canceleDelete={canceleDelete} />}
    </Container>
  );
}
const Container = styled.div`
position: relative;
 display: flex;
 flex-direction: column;
 align-items: center;
 table {
   margin: 30px 0 0 0;
   text-align: center;
   border-collapse: separate;
   border-spacing: 16px 8px;
   th {
    text-transform: capitalize;
   }
   .actions {
     /* position: absolute */
   }
   img {
     width: 25px;
     height: 25px;
   }
 }
`;
export default Cars;