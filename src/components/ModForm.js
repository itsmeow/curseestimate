import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ModForm = props => (
  <div>
    <h1>Enter a project ID</h1>
    <p>or slug or project url</p>
    <Formik
      initialValues={{ value: "" }}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values.value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="value" />
          <ErrorMessage name="value" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
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
