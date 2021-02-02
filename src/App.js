import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "./images/2.jpg";
import Dokumentuppgifter from "./componants/Document-uppdifter";
import Arendeuppgifter from "./componants/Arende-uppgifter";
import Kontaktadress from "./componants/Kontakt-adress";
import Ovrigt from "./componants/Ovrigt";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Alert from "./elements/Popup";
import strings from "./componants/lang";
function App() {
  /****************************************
   *  STATES
   ****************************************/
  const [data, setData] = useState({ hits: [] });

  const [country, setCountry] = useState("Select");
  const [lang, setLang] = useState("en");
  const [show, setShow] = useState({
    a: true,
    b: false,
    c: false,
    d: false,
    finish: false,
  });
  const [fieldsCollector, setFieldsCollector] = useState({
    dokumentuppgifter: {},
    arendeuppgifter: {},
    kontaktadress: {},
    ovrigt: {},
  });
  const [steps, setSteps] = useState(1);
  const [isLoading, setLoading] = useState(true);

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
      }).catch((err) => {
        console.log(err);
      });
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ margin: "auto", marginTop: "25%", marginLeft: "40%" }}>
        <Loader type="ThreeDots" color="#00BFFF" />
      </div>
    );
  }
  /****************************************
   *  POST
   ****************************************/
  const post = (data) => {
    axios.defaults.baseURL = "/";
    axios
      .post("/api/samordningsnummer", {
        data: data,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const documentCallback = (values) => {
    fieldsCollector.dokumentuppgifter = values;

    show.a = false;
    show.b = true;
    setShow((prevState) => ({
      ...prevState,
    }));
    setSteps(steps + 1);
  };

  const arendaCallback = (values) => {
    fieldsCollector.arendeuppgifter = values;

    show.b = false;
    show.c = true;
    setShow((prevState) => ({
      ...prevState,
    }));
    setSteps(steps + 1);
  };

  const kontaktCallback = (values) => {
    fieldsCollector.kontaktadress = values;
    show.c = false;
    show.d = true;

    setShow((prevState) => ({
      ...prevState,
    }));
    setSteps(steps + 1);
  };

  const overigtCallback = (values) => {
    fieldsCollector.ovrigt = values;

    /*........SUBMIT........*/
    post(fieldsCollector);

    show.d = false;
    show.finish = true;
    setShow((prevState) => ({
      ...prevState,
    }));
  };

  const switcher = (value) => {
    setLang(value);
    strings.setLanguage(`${value}`);
  };
  const goBack = () => {
    switch (steps) {
      case 2:
        show.a = true;
        show.b = false;
        setShow((prevState) => ({
          ...prevState,
        }));
        setSteps(steps - 1);
        break;
      case 3:
        show.b = true;
        show.c = false;
        setShow((prevState) => ({
          ...prevState,
        }));
        setSteps(steps - 1);
        break;
      case 4:
        show.c = true;
        show.d = false;
        setShow((prevState) => ({
          ...prevState,
        }));
        setSteps(steps - 1);
        break;
      default:
        break;
    }
  };
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
        <span className="title">{strings.head}</span>
      </div>
      <div className="parent">
        <div className="apptest">
          <h1>App </h1>
          <div className="lang">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => switcher(e.currentTarget.value)}
            >
              <option> EN</option>
              <option> SE</option>
            </select>
          </div>
        </div>

        <span style={{ float: "right", fontSize: "20px" }}>
          {!show.finish ? steps + strings.steps : ""}
        </span>
      </div>

      <div>
        {show.a && (
          <div>
            <h2>1. {strings.section1}</h2>
            <label> {strings.country}</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.currentTarget.value)}
            >
              {data.map((ele) => (
                <option key={ele} value={data[ele]}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        )}
        <Dokumentuppgifter
          status={show.a}
          documentCallback={documentCallback}
        ></Dokumentuppgifter>
      </div>

      <Arendeuppgifter
        arendaCallback={arendaCallback}
        status={show.b}
      ></Arendeuppgifter>

      <Kontaktadress
        kontaktCallback={kontaktCallback}
        status={show.c}
      ></Kontaktadress>

      <Ovrigt overigtCallback={overigtCallback} status={show.d}></Ovrigt>
      {show.finish && (
        <Alert type="success" title={strings.thanks} id="001">
          {strings.finished}
        </Alert>
      )}
      {!show.finish && (
        <button
          type="button"
          className="outline"
          style={{ backgroundColor: "#08c", width: "25%" }}
          onClick={goBack}
        >
          {" "}
          Back{" "}
        </button>
      )}
    </div>
  );
}

export default App;
