import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddSchedule() {
  const initialValues = {
    departure: "",
    designation: "",
    stations: "",
    days: "",
    startingTimes: "",
  };

  const validationSchema = Yup.object().shape({
    departure: Yup.string().required("Departure is required"),
    designation: Yup.string().required("Destination is required"),
    stations: Yup.string(),
    days: Yup.string(),
    startingTimes: Yup.string(),
  });

  const AddProduct = (values) => {
    axios
      .post("http://localhost:5003/SaveShedule", values)
      .then(() => {
        toast.success("Booking Added Successfully!!");
      })
      .catch(() => {
        toast.error("Error!!");
      });
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/3 shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-5 text-blue-700">
          Add New Schedule
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={AddProduct}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="departure"
                  className="block text-gray-600 font-bold mb-1"
                >
                  Departure
                </label>
                <Field
                  type="text"
                  name="departure"
                  id="departure"
                  className={`border rounded-md p-2 w-full ${
                    errors.departure && touched.departure
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-700"
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="departure"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="designation"
                  className="block text-gray-600 font-bold mb-1"
                >
                  Destination
                </label>
                <Field
                  type="text"
                  name="designation"
                  id="designation"
                  className={`border rounded-md p-2 w-full ${
                    errors.designation && touched.designation
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-700"
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="designation"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stations"
                  className="block text-gray-600 font-bold mb-1"
                >
                  Stations
                </label>
                <Field
                  type="text"
                  name="stations"
                  id="stations"
                  className={`border rounded-md p-2 w-full ${
                    errors.stations && touched.stations
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-700"
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="stations"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="days"
                  className="block text-gray-600 font-bold mb-1"
                >
                  Available Days
                </label>
                <Field
                  type="text"
                  name="days"
                  id="days"
                  className={`border rounded-md p-2 w-full ${
                    errors.days && touched.days
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-700"
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="days"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="startingTimes"
                  className="block text-gray-600 font-bold mb-1"
                >
                  Starting Times
                </label>
                <Field
                  type="text"
                  name="startingTimes"
                  id="startingTimes"
                  className={`border rounded-md p-2 w-full ${
                    errors.startingTimes && touched.startingTimes
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-700"
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="startingTimes"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800"
                >
                  Add Schedule
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
