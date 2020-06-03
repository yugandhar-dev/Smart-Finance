import React, { useState } from "react";
import "./App.css";
import FundOptions from "./FundOptions";

const mainDiv = {
  color: "white",
};

const App = () => {
  const [status, currentStatus] = useState(null);

  return (
    <div>
      {status !== null ? (
        <div>{status === "back" ? <FundOptions /> : <App />}</div>
      ) : (
        <div className="App">
          <h1 className="App-header" style={mainDiv}>
            Here are your fund details
          </h1>
          {/* <p>Email will be sent to the user once it is activated</p> */}
          <button onClick={() => currentStatus("back")} className="block">
            Back
          </button>
        </div>
      )}
    </div>
  );
  //         (
  //           alert("This is a risk fund.")

  //         )}
  //          </div>
  // );
};

export default App;
