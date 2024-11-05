// app/Context/State.jsx
"use client";

import Context from "./Context"; // Import `Context` correctly
import { useState } from "react";

const State = ({ children }) => {
  const [value, setValue] = useState(null);

  return (
    <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
  );
};

export default State;
