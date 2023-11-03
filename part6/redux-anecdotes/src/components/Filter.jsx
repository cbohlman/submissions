import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        onChange={(event) => dispatch(filterChange(event.target.value))}
      />
    </div>
  );
};

export default Filter;
