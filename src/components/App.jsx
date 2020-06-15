import React from "react";

import Header from "./Header.jsx";

import AddTodo from "./AddTodo.jsx";

const App = () => {
  return (
    <div>
      <Header />
      <div id="main">
        <AddTodo />
      </div>
    </div>
  );
};

export default App;
