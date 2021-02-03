import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Arenda.css";
import "./shared.css";
import { CountryDropdown } from "react-country-region-selector";
import strings from "./lang";
export const Arendeuppgifter = ({ arendaCallback }) => {
  return (
    <Formik
      initialValues={{
        yearOfBirth: "",
        monthOfBirth: "",
        dayOfBirth: "",
        picked: "",
        surname: "",
        firstname: "",
        additionalName: "",
        country: "Select Country",
      }}
      /*
      Taken from:
       https://stackoverflow.com/questions/65135707/validate-field-in-yup-based-on-multiple-related-field-values-with-yup-ref-and-t
      */
      validationSchema={Yup.object({
        yearOfBirth: Yup.string()
          .test("dobY", "Valid Year required", (value) => {
            const today = new Date();
            const adultYear = today.getFullYear() - 17;
            if (value < 1900 || value > adultYear) {
              return false;
            }
            return true;
          })
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(4, "Must be 4 digits")
          .max(4, "Must be 4 digits")
          .required("Valid Year required"),

        monthOfBirth: Yup.string()
          .matches(/^(0[1-9]|1[012])$/, "Invalid Month")
          .required("Month is Required, example: 03"),

        dayOfBirth: Yup.string()
          .test("dobD", "Invalid Day", (value) => {
            if (value < 1 || value > 31) {
              return false;
            }

            if (
              (Yup.ref("dobM") == 4 ||
                Yup.ref("dobM") == 6 ||
                Yup.ref("dobM") == 9 ||
                Yup.ref("dobM") == 11) &&
              value == 31
            ) {
              return false;
            }

            if (Yup.ref("dobM") == 2) {
              const isLeapYear =
                Yup.ref("dobY") % 4 == 0 &&
                (Yup.ref("dobY") % 100 != 0 || Yup.ref("dobY") % 400 == 0);

              if (day > 29 || (day == 29 && !isLeapYear)) {
                return false;
              }
            }

            return true;
          })
          .min(2, "Invalid")
          .max(2, "Invalid")
          .required("Day is Required, example:15"),
        surname: Yup.string()
          .max(60, "Must not exceed 60 characters")
          .required("Surname is Required"),

        firstname: Yup.string().optional(),
        additionalName: Yup.string()
          .max(200, "should not exceed 200 characters")
          .optional("Other information.. "),
      })}
      onSubmit={(values, { setSubmitting }) => {
        values.firstname = values.firstname === "" ? "---" : values.firstname;
        arendaCallback(values);
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <h2>2. {strings.application}</h2>

          <label htmlFor="yearOfBirth">{strings.yearOfBirth} </label>
          <Field
            id="yearOfBirth"
            type="text"
            {...formik.getFieldProps("yearOfBirth")}
          />
          {formik.touched.yearOfBirth && formik.errors.yearOfBirth ? (
            <div className="error">{formik.errors.yearOfBirth}</div>
          ) : null}

          <label htmlFor="monthOfBirth">{strings.monthOfBirth}</label>
          <Field
            id="monthOfBirth"
            type="text"
            {...formik.getFieldProps("monthOfBirth")}
          />
          {formik.touched.monthOfBirth && formik.errors.monthOfBirth ? (
            <div className="error">{formik.errors.monthOfBirth}</div>
          ) : null}

          <label htmlFor="dayOfBirth">{strings.dayOfBirth}</label>
          <Field
            id="dayOfBirth"
            type="text"
            {...formik.getFieldProps("dayOfBirth")}
          />
          {formik.touched.dayOfBirth && formik.errors.dayOfBirth ? (
            <div className="error">{formik.errors.dayOfBirth}</div>
          ) : null}
          <label htmlFor="radio"> {strings.gender} </label>
          <div role="group">
            <div>
             <span style={{fontSize:"14px"}}>
               {strings.male}
               </span> 
              <Field type="radio" className="radio" name="picked" value="One" />
             <span style={{fontSize:"14px"}}>
              {strings.female}
               </span> 
              <Field type="radio" className="radio" name="picked" value="Two" />
            </div>
          </div>

          <label htmlFor="Name"> {strings.surname} </label>
          <Field
            id="surname"
            type="text"
            {...formik.getFieldProps("surname")}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <div className="error">{formik.errors.surname}</div>
          ) : null}

          <label htmlFor="firstname"> {strings.firstname}</label>
          <Field
            id="firstname"
            type="text"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div className="error">{formik.errors.firstname}</div>
          ) : null}

          <label htmlFor="additionalName"> {strings.info}</label>
          <textarea
            id="additionalName"
            type="text"
            {...formik.getFieldProps("additionalName")}
          />
          {formik.touched.additionalName && formik.errors.additionalName ? (
            <div className="error">{formik.errors.additionalName}</div>
          ) : null}

          <label htmlFor="placeOfBirth">{strings.place}</label>
          <CountryDropdown
            name="country"
            value={formik.values.country}
            onChange={(_, e) => formik.handleChange(e)}
            onBlur={formik.handleBlur}
          />

          <button type="submit">{strings.next} </button>
        </Form>
      )}
    </Formik>
  );
};
export default Arendeuppgifter;
