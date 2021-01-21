import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({ hits: [] });
  const config = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("api/countries", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Hello World</h1>
      {console.log(data)}
    </div>
  );
}

export default App;
