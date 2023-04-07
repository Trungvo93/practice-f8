import React from "react";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch({ type: "INCREASE" });
  };
  return (
    <div className="container text-center mt-5">
      <span className="me-3"> {count}</span>
      <button className="btn btn-primary" onClick={handleIncrease}>
        Increase
      </button>
    </div>
  );
};

export default Home;
