import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Arendeuppgifter = () => {
  return (
    <Formik
      initialValues={{ yearOfBirth: "", monthOfBirth: "", dayOfBirth: "" }}
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

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
export default Arendeuppgifter;
