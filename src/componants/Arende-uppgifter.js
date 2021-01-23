import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Radio, TextareaAutosize } from "@material-ui/core";
import "./Arenda.css";
import { CountryDropdown } from "react-country-region-selector";

export const Arendeuppgifter = () => {
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
          .test("dobM", "Invalid Month", (value) => {
            if (value < 1 || value > 12) {
              return false;
            }
            return true;
          })
          .min(2, "Invalid")
          .max(2, "Invalid")
          .required("Required"),

        dayOfBirth: Yup.string()
          .test("dobD", "Invalid Day", (value) => {
            if (value < 1 || value > 31) {
              return false;
            }

            // Check months with less than 31 days - DOESNT WORK
            // 4. April
            // 6. June
            // 9. September
            // 11. November
            if (
              (Yup.ref("dobM") == 4 ||
                Yup.ref("dobM") == 6 ||
                Yup.ref("dobM") == 9 ||
                Yup.ref("dobM") == 11) &&
              value == 31
            ) {
              return false;
            }

            // If February - DOESNT WORK
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
          .required("Required"),
        surname: Yup.string()
          .max(60, "Must not exceed 60 characters")
          .required("Required"),

        firstname: Yup.string().default("--").nullable(true),
        additionalName: Yup.string()
          .max(200, "should not exceed 200 characters")
          .optional("Other information.. "),
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
          <label htmlFor="yearOfBirth">Year Of Birth</label>
          <Field
            id="yearOfBirth"
            type="text"
            {...formik.getFieldProps("yearOfBirth")}
          />
          {formik.touched.yearOfBirth && formik.errors.yearOfBirth ? (
            <div>{formik.errors.yearOfBirth}</div>
          ) : null}

          <label htmlFor="monthOfBirth">Month</label>
          <Field
            id="monthOfBirth"
            type="text"
            {...formik.getFieldProps("monthOfBirth")}
          />
          {formik.touched.monthOfBirth && formik.errors.monthOfBirth ? (
            <div>{formik.errors.monthOfBirth}</div>
          ) : null}

          <label htmlFor="dayOfBirth">Day</label>
          <Field
            id="dayOfBirth"
            type="text"
            {...formik.getFieldProps("dayOfBirth")}
          />
          {formik.touched.dayOfBirth && formik.errors.dayOfBirth ? (
            <div>{formik.errors.dayOfBirth}</div>
          ) : null}

          <div>Gender </div>
          <div role="group">
            <div>
              Male
              <Field type="radio" name="picked" value="One" />
              Female
              <Field type="radio" name="picked" value="Two" />
            </div>
          </div>
          <div>
            Picked:
            {formik.values.picked}
          </div>

          <label htmlFor="Name"> Sure name </label>
          <Field
            id="surname"
            type="text"
            {...formik.getFieldProps("surname")}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <div>{formik.errors.surname}</div>
          ) : null}

          <label htmlFor="Name"> First name </label>
          <Field
            id="firstname"
            type="text"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div>{formik.errors.firstname}</div>
          ) : null}

          <label htmlFor="additionalName"> Additional Information </label>
          <textarea
            id="additionalName"
            type="text"
            {...formik.getFieldProps("additionalName")}
          />
          {formik.touched.additionalName && formik.errors.additionalName ? (
            <div>{formik.errors.additionalName}</div>
          ) : null}

          <label htmlFor="placeOfBirth">Place Of Birth</label>
          <CountryDropdown
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
export default Arendeuppgifter;
