import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const ModForm = props => (
  <div>
    <h1>Enter a project ID</h1>
    <p>or slug or project url</p>
    <Formik
      initialValues={{ value: "" }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.value.match(URL_REGEX)) {
          let url = values.value;

          if (url.endsWith("/")) {
            url = url.substring(0, url.length - 1);
          }

          props.onSubmit(url.split("/").pop(-1));
        } else {
          props.onSubmit(values.value);
        }

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field className="high" type="text" name="value" />
          <ErrorMessage name="value" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Estimate
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

ModForm.propType = {
  onSubmit: PropTypes.func.isRequired
};

export default ModForm;
