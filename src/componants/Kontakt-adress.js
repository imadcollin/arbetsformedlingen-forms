import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./shared.css";
import strings from "./lang"
export const Kontaktadress = ({ kontaktCallback }) => {
  return (
    <Formik
      initialValues={{
        c_o_address: "",
        ort: "",
        country: "",
        region: "",
        street: "",
        apartment_no: "",
        post_no: "",
        post_ort: "",
      }}
      validationSchema={Yup.object({
        c_o_address: Yup.string()
          .max(35, "Must not exceed 35 characters")
          .optional(),
        ort: Yup.string()
          .max(35, "Must not exceed 35 characters")
          .required("Required"),
        street: Yup.string()
          .max(35, "Must not exceed 35 characters")
          .required("Required."),
        apartment_no: Yup.string()
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(4, "Must be 4 digits")
          .max(4, "Must be 4 digits")
          .required("Apartment number is required"),
        post_no: Yup.string()
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(5, "Must be 5 digits")
          .max(5, "Must be 5 digits")
          .required("Post number is required"),
        post_ort: Yup.string()
          .max(27, "Must not exceed 27 characters")
          .required("Required"),
      })}
      onSubmit={(values) => {
        kontaktCallback(values);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <h2>3. {strings.contact}</h2>

          <label htmlFor="c_o_address"> {strings.c_o}</label>
          <Field
            id="c_o_address"
            type="text"
            {...formik.getFieldProps("c_o_address")}
          />
          {formik.touched.c_o_address && formik.errors.c_o_address ? (
            <div className="error">{formik.errors.c_o_address}</div>
          ) : null}

          <label htmlFor="ort"> {strings.city}</label>
          <Field id="ort" type="text" {...formik.getFieldProps("ort")} />
          {formik.touched.ort && formik.errors.ort ? (
            <div className="error">{formik.errors.ort}</div>
          ) : null}
          <label htmlFor="ort"> {strings.Country_and_region}</label>

          <div>
            <CountryDropdown
              name="country"
              value={formik.values.country}
              onChange={(_, e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
            />
            <RegionDropdown
              name="region"
              country={formik.values.country}
              value={formik.values.region}
              onChange={(_, e) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
            />
          </div>

          <label htmlFor="street"> {strings.street} </label>
          <Field id="street" type="text" {...formik.getFieldProps("street")} />
          {formik.touched.street && formik.errors.street ? (
            <div className="error">{formik.errors.street}</div>
          ) : null}

          <label htmlFor="apartment_no"> {strings.apartment_no} </label>
          <Field
            id="apartment_no"
            type="text"
            {...formik.getFieldProps("apartment_no")}
          />
          {formik.touched.apartment_no && formik.errors.apartment_no ? (
            <div className="error">{formik.errors.apartment_no}</div>
          ) : null}

          <label htmlFor="post_no"> {strings.post_no}</label>
          <Field
            id="post_no"
            type="text"
            {...formik.getFieldProps("post_no")}
          />
          {formik.touched.post_no && formik.errors.post_no ? (
            <div className="error">{formik.errors.post_no}</div>
          ) : null}

          <label htmlFor="post_ort"> {strings.post_ort}</label>
          <Field
            id="post_ort"
            type="text"
            {...formik.getFieldProps("post_ort")}
          />
          {formik.touched.post_ort && formik.errors.post_ort ? (
            <div className="error">{formik.errors.post_ort}</div>
          ) : null}

          <button type="submit">{strings.next}</button>
        </Form>
      )}
    </Formik>
  );
};
export default Kontaktadress;
