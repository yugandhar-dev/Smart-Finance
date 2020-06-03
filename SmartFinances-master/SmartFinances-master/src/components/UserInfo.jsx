import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import UserManagement from "./UserManagement";
const mainDiv = {
  color: "white",
};

const App = () => {
  const [status, currentStatus] = useState(null);

  return (
    <div>
      {status !== null ? (
        <div>{status === "back" ? <UserManagement /> : <AdminLogin />}</div>
      ) : (
        <div className="App">
          <h1 className="App-header" style={mainDiv}>
            User Info
          </h1>
          <p>Here are user details</p>
          <button onClick={() => currentStatus("back")} className="block">
            Back
          </button>
        </div>
      )}
    </div>
  );
  // return (
  //   <div>
  //     {status !== null ? (
  //       <div>{status == "option1" ? <Option1 /> : <Option2 />}</div>
  //     ) : (
  //       <div>
  //         <button onClick={() => currentStatus("option1")}> Option 1</button>
  //         <button onClick={() => currentStatus("option2")}> Option 2</button>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default App;
