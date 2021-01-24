import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

export const Kontaktadress = () => {
  return (
    <Formik
      initialValues={{ c_o_address: "", ort: "", country: "", region: "" }}
      validationSchema={Yup.object({
        c_o_address: Yup.string()
          .max(35, "Must not exceed 35 characters")
          .optional(),
        ort: Yup.string()
          .max(35, "Must not exceed 35 characters")
          .required("Required"),
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

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
export default Kontaktadress;
