import { FETCH_CARS, SUCCESSFULY_REGISTERED, DELETE, EDIT } from '../actions/types';

const initialState = {
  cars: [{
    "id": 0,
    "brand": {
      "name": "audi",
      "id": 3
    },
    "model": "Q7",
    "date": new Date(),
    "description": "uiug oihfefh gergrehreh"
  }],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };
    case SUCCESSFULY_REGISTERED:
      return {
        ...state,
        cars: state.cars.concat(action.payload),
        loading: false
      };
      case DELETE:
      return {
        ...state,
        cars: state.cars.filter((element) => element.id !== action.payload),
      };
      case EDIT:
        return {
          ...state,
          cars: [
            ...state.cars.slice(0, action.index),
           action.payload,
            ...state.cars.slice(
              action.index + 1,
              state.cars.length
            ),
          ],
          editTodo: {},
        };
    default:
      return state;
  }
}
