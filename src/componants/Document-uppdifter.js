import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./shared.css";
const Dokumentuppgifter = ({ documentCallback }) => {
  const [file, setFile] = React.useState("");
  const [base64, setBase64] = React.useState("");

  function handleUpload(event) {
    console.log("working");
    setFile(event.target.files[0]);
    const selectedFile = event.target.files;

    if (selectedFile.length > 0) {
      console.log(">0");

      var fileToLoad = selectedFile[0];
      var fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        let result = fileLoadedEvent.target.result;
        setBase64(result);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }
  return (
    <Formik
      initialValues={{ namn: "", telefon: "", email: "", handling: "" }}
      validationSchema={Yup.object({
        namn: Yup.string()
          .max(60, "Must not exceed 60 characters")
          .required("Required"),
        telefon: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        handling: Yup.boolean().optional(),
      })}
      onSubmit={(values) => {
        values["base64"] = base64;
        documentCallback(values);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <label htmlFor="Name"> Name</label>
          <Field id="namn" type="text" {...formik.getFieldProps("namn")} />
          {formik.touched.namn && formik.errors.namn ? (
            <div className="error">{formik.errors.namn}</div>
          ) : null}
          <label htmlFor="telefon">Telefon</label>
          <Field
            id="telefon"
            type="text"
            {...formik.getFieldProps("telefon")}
          />
          {formik.touched.telefon && formik.errors.telefon ? (
            <div className="error">{formik.errors.telefon}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <Field id="email" type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="handling">Handling</label>
          <div id="upload-box">
            <input type="file" onChange={handleUpload} />
            <p>{file.name}</p>
          </div>

          {/* <Field
            id="handling"
            type="file"
            onChange={formik.handleUpload}
            onChange={handleUpload} 
            {...formik.getFieldProps("handling")}
          /> */}
          {formik.touched.handling && formik.errors.handling ? (
            <div className="error">{formik.errors.handling}</div>
          ) : null}
          <button type="submit">NEXT</button>
        </Form>
      )}
    </Formik>
  );
};
export default Dokumentuppgifter;
