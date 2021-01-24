import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";

export const Dokumentuppgifter = () => {
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
        handling: Yup.string()
          .max(15, "Must be 15 characters or less")
          .optional(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <label htmlFor="Name"> Name</label>
          <Field id="namn" type="text" {...formik.getFieldProps("namn")} />
          {formik.touched.namn && formik.errors.namn ? (
            <div>{formik.errors.namn}</div>
          ) : null}
          <label htmlFor="telefon">Telefon</label>
          <Field
            id="telefon"
            type="text"
            {...formik.getFieldProps("telefon")}
          />
          {formik.touched.telefon && formik.errors.telefon ? (
            <div>{formik.errors.telefon}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <Field id="email" type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <label htmlFor="handling">Handling</label>

          <Field
            id="handling"
            type="text"
            {...formik.getFieldProps("handling")}
          />
          {formik.touched.handling && formik.errors.handling ? (
            <div>{formik.errors.handling}</div>
          ) : null}
          <button type="submit">NEXT</button>
        </Form>
      )}
    </Formik>
  );
};
export default Dokumentuppgifter;
