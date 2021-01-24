import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const Ovrigt = () => {
  return (
    <Formik
      initialValues={{
        id: "",
      }}
      validationSchema={Yup.object({
        id: Yup.string().required("Required, select and ID"),
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
            <div>{formik.errors.id}</div>
          ) : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
export default Ovrigt;
