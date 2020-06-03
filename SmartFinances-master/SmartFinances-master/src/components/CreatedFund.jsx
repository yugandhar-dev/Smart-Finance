import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import FundManagement from "./FundManagement";
const mainDiv = {
  color: "white",
};

const App = () => {
  const [status, currentStatus] = useState(null);

  return (
    <div>
      {status !== null ? (
        <div>{status === "back" ? <FundManagement /> : <AdminLogin />}</div>
      ) : (
        <div className="App">
          <h1 className="App-header" style={mainDiv}>
            Fund has been created successfully
          </h1>
          FUND REFERENCE NUMBER: 123456
          <br></br>
          <br></br>
          <br></br>
          <button onClick={() => currentStatus("back")} className="block">
            Back
          </button>
        </div>
      )}
    </div>
  );
};
export default App;
