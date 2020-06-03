import React, { useState } from "react";
import "./App.css";
import UserDashboard from "./UserDashboard";

const App = () => {
  const [status] = useState(null);

  return (
    <div>
      {status !== null ? (
        <div>{status === "user" ? <UserDashboard /> : <App />}</div>
      ) : (
        <h1>Funds added successfully</h1>
      )}
    </div>
  );
};

export default App;
