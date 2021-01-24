import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export const Kontaktadress = () => {
  return (
    <Formik
      initialValues={{
        c_o_address: "",
        ort: "",
        country: "",
        region: "",
        street: "",
        apartment_no: "",
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
          <h2>3. Kontaktadress</h2>

          <label htmlFor="c_o_address"> C/O (Optional)</label>
          <Field
            id="c_o_address"
            type="text"
            {...formik.getFieldProps("c_o_address")}
          />
          {formik.touched.c_o_address && formik.errors.c_o_address ? (
            <div>{formik.errors.c_o_address}</div>
          ) : null}

          <label htmlFor="ort"> Ort</label>
          <Field id="ort" type="text" {...formik.getFieldProps("ort")} />
          {formik.touched.ort && formik.errors.ort ? (
            <div>{formik.errors.ort}</div>
          ) : null}
          <label htmlFor="ort"> Country and Region</label>

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

          <label htmlFor="street"> Street </label>
          <Field id="street" type="text" {...formik.getFieldProps("street")} />
          {formik.touched.street && formik.errors.street ? (
            <div>{formik.errors.street}</div>
          ) : null}

          <label htmlFor="apartment_no"> Apartment Number </label>
          <Field
            id="apartment_no"
            type="text"
            {...formik.getFieldProps("apartment_no")}
          />
          {formik.touched.apartment_no && formik.errors.apartment_no ? (
            <div>{formik.errors.apartment_no}</div>
          ) : null}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
export default Kontaktadress;