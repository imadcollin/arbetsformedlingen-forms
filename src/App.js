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
  const [show, setShow] = useState({ a: true, b: false, c: false, d: false });

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
    console.log(values);
    show.a = false;
    show.b = true;

    setShow((prevState) => ({
      ...prevState,
    }));
  };

  const arendaCallback = (values) => {
    console.log(values);
    show.b = false;
    show.c = true;
    setShow((prevState) => ({
      ...prevState,
    }));
  };

  const kontaktCallback = (values) => {
    console.log(values);
    show.c = false;
    show.d = true;

    setShow((prevState) => ({
      ...prevState,
    }));
  };

  const overigtCallback = (values) => {
    console.log(values);

    /*........SUBMIT........*/
    post();
  };
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
        <span className="title">Arbetsformedlingen Forms</span>
      </div>
      <h1>App</h1>

      {show.a && (
        <div>
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
          <Dokumentuppgifter
            documentCallback={documentCallback}
          ></Dokumentuppgifter>
        </div>
      )}

      {show.b && (
        <Arendeuppgifter arendaCallback={arendaCallback}></Arendeuppgifter>
      )}
      {show.c && (
        <Kontaktadress kontaktCallback={kontaktCallback}></Kontaktadress>
      )}
      {show.d && <Ovrigt overigtCallback={overigtCallback}></Ovrigt>}
    </div>
  );
}

export default App;
