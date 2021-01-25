import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./shared.css";
export const Ovrigt = ({ overigtCallback }) => {
  return (
    <Formik
      initialValues={{
        id: "",
        underlagId: "",
        upplysning: "",
      }}
      validationSchema={Yup.object({
        id: Yup.string().required("Required, select and ID"),
        underlagId: Yup.string()
          .max(80, "Maximum 80 characters")
          .when("id", {
            is: (value) => value === "NEJ" || value === "PASS",
            then: Yup.string().required("Required..."),
          }),
        upplysning: Yup.string().max(200, "Maximum 200 characters").optional(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        overigtCallback(values);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <h2>4. Ovrigt</h2>

          <select
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ display: "block" }}
          >
            <option value="" label="Select " />
            <option value="PASS" label="PASS" />
            <option value="NATIONALLT ID" label="NATIONALLT ID" />
            <option value="ANNAN HANDLING" label="ANNAN HANDLING" />
            <option value="NEJ" label="NEJ" />
          </select>
          {formik.touched.id && formik.errors.id ? (
            <div className="error">{formik.errors.id}</div>
          ) : null}

          {formik.values.id === "NEJ" || formik.values.id === "PASS" ? (
            <div>
              <label htmlFor="underlagId"> Underlag ID </label>
              <Field
                id="underlagId"
                type="text"
                {...formik.getFieldProps("underlagId")}
              />
            </div>
          ) : null}
          {formik.touched.underlagId && formik.errors.underlagId ? (
            <div className="error">{formik.errors.underlagId}</div>
          ) : null}

          <label htmlFor="upplysning">Additional Information (Optional)</label>
          <textarea
            id="upplysning"
            type="text"
            {...formik.getFieldProps("upplysning")}
          />
          {formik.touched.upplysning && formik.errors.upplysning ? (
            <div className="error">{formik.errors.upplysning}</div>
          ) : null}
          <button type="submit">SUBMIT</button>
        </Form>
      )}
    </Formik>
  );
};
export default Ovrigt;
