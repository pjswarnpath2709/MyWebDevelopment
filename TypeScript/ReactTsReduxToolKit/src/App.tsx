import { useDispatch, useSelector } from "react-redux";
import { incrementByValue, increment, decrement } from "./redux/counterSlice";
import { useState } from "react";
import { ReduxStoreStateType } from "./redux";

function App() {
  const [val, setVal] = useState<number>(0);

  const dispatch = useDispatch();
  const IncByVal = (): void => {
    dispatch(incrementByValue(val));
  };

  const Inc = (): void => {
    dispatch(increment());
  };

  const Dec = (): void => {
    dispatch(decrement());
  };

  const { count } = useSelector(
    (state: ReduxStoreStateType) => state.counterSlice
  );

  return (
    <div>
      <h1>ToolKit</h1>
      {count}
      <button onClick={Inc}>+</button>
      <button onClick={Dec}>-</button>
      <input
        type="number"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
      />
      <button onClick={IncByVal}>Add</button>
    </div>
  );
}

export default App;
