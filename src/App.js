import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "./images/2.jpg";
import Dokumentuppgifter from "./componants/Document-uppdifter";
import Arendeuppgifter from "./componants/Arende-uppgifter";
import Kontaktadress from "./componants/Kontakt-adress";
import Ovrigt from "./componants/Ovrigt";
function App() {
  /****************************************
   *  STATES
   ****************************************/
  const [data, setData] = useState({ hits: [] });

  const [country, setCountry] = useState("Select");

  const getter = [
    "Sverige",
    "Tyskland",
    "Danmark",
    "Polen",
    "Frankrike",
    "Norge",
    "Italien",
  ];

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
    console.log("Post..");
    axios.defaults.baseURL = "/";
    axios
      .post("/api/samordningsnummer", {
        data: {
          name: "namn",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const documentCallback = (values) => {
    console.log("test");
    console.log(values);
  };

  const arendaCallback = (values) => {
    console.log("test");
    console.log(values);
  };
  const overigtCallback = (values) => {
    console.log("test");
    console.log(values);
  };
  const kontaktCallback = (values) => {
    console.log("test");
    console.log(values);
  };
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
        <span className="title">Arbetsformedlingen Forms</span>
      </div>
      <h1>App</h1>

      <h2>1. Dokumentuppgifter</h2>
      <label> Country</label>
      <select
        value={country}
        onChange={(e) => setCountry(e.currentTarget.value)}
      >
        {getter.map((ele) => (
          <option key={ele} value={getter[ele]}>
            {ele}
          </option>
        ))}
      </select>
      {/* <Dokumentuppgifter formCallback={documentCallback}></Dokumentuppgifter>
      <Arendeuppgifter arendaCallback={arendaCallback}></Arendeuppgifter>
      <Kontaktadress kontaktCallback={kontaktCallback}></Kontaktadress>
      <Ovrigt overigtCallback={overigtCallback}></Ovrigt> */}

      <button type="submit" onClick={post}>
        SUBMIT
      </button>
    </div>
  );
}

export default App;
