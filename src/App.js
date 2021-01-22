import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function App() {
  const schema = yup.object().shape({
    namn: yup.string().required().length(60),
    telefon: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
        "Invalid phone number"
      )
      .max(15),
    post: yup.string().email().required().max(60),
    handling: yup.string().optional(),
    birthday: yup.date().max(new Date()).max(4),
  });

  /****************************************
   *  STATES
   ****************************************/
  const [data, setData] = useState({ hits: [] });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const onSubmit = (data) => console.log(data);

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
      .post("/api/samordningsnummer", {
        data: {
          name,
          surname,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        namn <input type="text" name="namn" ref={register} />
        <p>{errors.namn?.message}</p>
        telefon <input type="text" name="telefon" ref={register} />
        <p>{errors.telefon?.message}</p>
        post <input type="email" name="email" ref={register} />
        <p>{errors.post?.message}</p>
        handling <input type="text" name="handling" ref={register} />
        <p>{errors.handling?.message}</p>
        <h2>Arendeuppgifter/Person</h2>
        birthday <input type="dateOfBirth" name="birthday" ref={register} />
        <p>{errors.birthday?.message}</p>


        <input type="submit" />
      </form>
      );
    </div>
  );
}

export default App;
