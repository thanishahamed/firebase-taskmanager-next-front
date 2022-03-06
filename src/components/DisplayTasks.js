import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DisplayTasks = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  }, []);
  return (
    <div>
      <h1>{"Display Tasks".toUpperCase()}</h1>
    </div>
  );
};

export default DisplayTasks;
