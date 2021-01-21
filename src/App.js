import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [data, setData] = useState({ hits: [] });
  const { register, handleSubmit, watch, errors } = useForm();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  console.log(watch("example"));
  const config = {
    headers: { "Access-Control-Allow-Origin": "*" },
  };
/****************************************
 *  EFFECT
 ****************************************/
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
/****************************************
 *  POST
 ****************************************/
  const post = () => {
    axios.defaults.baseURL = "/";
    axios
      .post(
        "/api/samordningsnummer",
        {
          data: {
            name,
            surname,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
      {console.log(data)}
      <form onSubmit={handleSubmit(post)}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={register}
        />
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          ref={register({ required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
