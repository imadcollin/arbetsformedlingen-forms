import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "./images/2.jpg";

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
      <form onSubmit={handleSubmit(post)}>
        <label> Namn</label>
        <input
          type="text"
          name="namn"
          value={namn}
          onChange={(e) => setNamn(e.target.value)}
          ref={register}
        />
        <p>{errors.namn?.message}</p> <label> Telefon</label>
        <input
          type="text"
          name="telefon"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          ref={register}
        />
        <p>{errors.telefon?.message}</p>
        <label> Post</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={register}
        />
        <p>{errors.post?.message}</p> <label> Handling</label>
        <input
          type="text"
          name="handling"
          value={handling}
          onChange={(e) => setHandling(e.target.value)}
          ref={register}
        />
        <p>{errors.handling?.message}</p>
        <h2>2. Arendeuppgifter</h2>
        <label> Birthday</label>
        <input
          type="dateOfBirth"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          ref={register}
        />
        <p>{errors.birthday?.message}</p>
        <h2>3 Arendeuppgifter</h2>
        FaststalltId
        <select
          value={faststalltId}
          onChange={(e) => setFaststalltId(e.currentTarget.value)}
        >
          <option value={faststalltId}>{faststalltId}</option>
          {identity.map((ele) => (
            <option key={ele} value={identity[ele]}>
              {ele}
            </option>
          ))}
        </select>
        <p>{errors.faststalltId?.message}</p>
        <input type="submit" />
      </form>
      );
    </div>
  );
}

export default App;
