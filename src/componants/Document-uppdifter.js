import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./shared.css"
export const Dokumentuppgifter = ({ documentCallback }) => {
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
        // telefon: yup
        //   .string()
        //   .required("Phone number is required")
        //   .matches(
        //     /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
        //     "Invalid phone number"
        //   )
        //   .max(15),
        email: Yup.string().email("Invalid email address").required("Required"),
        handling: Yup.string()
          .max(15, "Must be 15 characters or less")
          .optional(),
      })}
      onSubmit={(values, { setSubmitting }) => {
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

          <Field
            id="handling"
            type="text"
            {...formik.getFieldProps("handling")}
          />
          {formik.touched.handling && formik.errors.handling ? (
            <div className="error">{formik.errors.handling}</div>
          ) : null}
          <button type="submit">NEXT</button>
          {/* <button onClick={()=>test("testing")}>click</button> */}
        </Form>
      )}
    </Formik>
  );
};
export default Dokumentuppgifter;
