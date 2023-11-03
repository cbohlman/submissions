import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter: <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
