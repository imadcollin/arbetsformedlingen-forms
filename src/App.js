import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "./images/2.jpg";
import Dokumentuppgifter from "./componants/Document-uppdifter";
import Arendeuppgifter from "./componants/Arende-uppgifter";
import Kontaktadress from "./componants/Kontakt-adress";
import Ovrigt from "./componants/Ovrigt";
function App() {
  const schema = yup.object().shape({
    namn: yup.string().required().max(60),
    // telefon: yup
    //   .string()
    //   .required("Phone number is required")
    //   .matches(
    //     /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
    //     "Invalid phone number"
    //   )
    //   .max(15),
    telefon: yup.number().positive().required(),
    email: yup.string().email().required().max(60),
    handling: yup.string().optional(),
    birthday: yup.date().max(new Date()).max(4),
    faststalltId: yup.string().ensure().required("Please Select One Option"),
  });

  /****************************************
   *  STATES
   ****************************************/
  const [data, setData] = useState({ hits: [] });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [country, setCountry] = useState("Select");
  const [namn, setNamn] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [handling, setHandling] = useState("");
  const [birthday, setBirthday] = useState("");
  const [faststalltId, setFaststalltId] = useState("");
  const onSubmit = (data) => console.log(data);

  const getter = [
    "Sverige",
    "Tyskland",
    "Danmark",
    "Polen",
    "Frankrike",
    "Norge",
    "Italien",
  ];

  const identity = ["PASS", "NATIONELLT ID", "ANNAN HANDLING", "NEJ"];
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
          namn,
          telefon,
          email,
          handling,
          birthday,
          country,
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
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
        <span className="title">Arbetsformedlingen Forms</span>
      </div>
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
      <Dokumentuppgifter formCallback={documentCallback}></Dokumentuppgifter>
      <Arendeuppgifter arendaCallback={arendaCallback}></Arendeuppgifter>
      <Kontaktadress ></Kontaktadress>
      <Ovrigt overigtCallback={overigtCallback}></Ovrigt>
      <form onSubmit={handleSubmit(post)}>
        <h1>App</h1>
        <label> To be removed </label>
        <input
          type="text"
          name="namn"
          value={namn}
          onChange={(e) => setNamn(e.target.value)}
          ref={register}
        />    
        <input type="submit" />
      </form>
      );
    </div>
  );
}

export default App;
