import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const AddBooking = () => {
const [existingSchedule, setExistingSchedule] = useState([]);
const [schId, setId] = useState(null);

  const initialValues = {
    schedule: "",
    from: "",
    to: "",
    date: "",
    time: "",
    count: "",
  };

  const validationSchema = Yup.object().shape({
    schedule: Yup.string().required("Schedule is required"),
    from: Yup.string().required("From is required"),
    to: Yup.string().required("To is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    count: Yup.string().required("Count is required"),
  });

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:5003/SaveBooking", {
        schedule: values.schedule,
        from: values.from,
        to: values.to,
        date: values.date,
        time: values.time,
        count: values.count,
      })
      .then(() => {
        toast.success("Booking Added Successfully!!");
       
      })
      .catch(() => {
        toast.error("Error while adding booking");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5003/GetAlBookings")
      .then((response) => {
        if (response) {
          setExistingSchedule(response.data);
         
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  }, [existingSchedule]);

  

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    console.log(selectedId);
    setId(selectedId); // Update the id state with the selected value
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96" style={{width:"33%"}}>
        <h1 className="text-3xl font-bold mb-6">Add New Booking</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
              <div className="ll">
                      {" "}
                      <p className="font-semibold">Train Schedule</p>
                    </div>
                    <div className="ll">
                      <div className="ll">
                        <select
                          className="w-full outline-2 border p-3"
                          required={true}
                          onChange={handleSelectChange}
                          value={schId}
                        >
                          <option className="p-3" value="">
                            -select-
                          </option>
                          {existingSchedule && existingSchedule.map((sch) => (
                            <option key={sch.id} value={sch.id}>
                              {sch.departure} - {sch.designation}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
              </div>

              <div className="mb-4">
                <label htmlFor="from" className="block text-gray-600">
                  From:
                </label>
                <Field
                  type="text"
                  id="from"
                  name="from"
                  className={`w-full border rounded-md p-2 ${
                    errors.from && touched.from ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="from"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="to" className="block text-gray-600">
                  To:
                </label>
                <Field
                  type="text"
                  id="to"
                  name="to"
                  className={`w-full border rounded-md p-2 ${
                    errors.to && touched.to ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="to"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-600">
                  Date:
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className={`w-full border rounded-md p-2 ${
                    errors.date && touched.date ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="time" className="block text-gray-600">
                  Time:
                </label>
                <Field
                  type="time"
                  id="time"
                  name="time"
                  className={`w-full border rounded-md p-2 ${
                    errors.time && touched.time ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="count" className="block text-gray-600">
                  Count:
                </label>
                <Field
                  type="text"
                  id="count"
                  name="count"
                  className={`w-full border rounded-md p-2 ${
                    errors.count && touched.count ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="count"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Add Booking
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBooking;
