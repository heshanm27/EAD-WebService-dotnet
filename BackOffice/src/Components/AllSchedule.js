import { Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AllSchedule() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);


  const initialValues = {
    departure: "",
    designation: "",
    stations: "",
    days: "",
    startingTimes: "",
  };

  const [sc, setSc] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:5003/GetAlShedule")
      .then((response) => {
        console.log(response.data.data);
        setSc(response.data.data);
        if (response) {
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5003/DeleteShedule?id=${id}`)
      .then(() => {
        toast.error("Deleted Successfully!!");
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const UpdateData = (item) => {
    console.log(item);
    const updatedSchedule = {
      id: item.id,
      departure: item.departure,
      designation: item.designation,
      stations: item.stations,
      days: item.days,
      startingTimes: item.startingTimes,
    };

    axios
      .put(`http://localhost:5003/UpdateShedule?id=${item.id}`, updatedSchedule)
      .then((response) => {
        // console.log(response);
        getData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
     
      <div className="w-full flex flex-row-reverse px-10 mt-10">
        <button
          type="button"
          onClick={() => {
            navigate('/addschedule')
          }}
          class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {" "}
          Add New
         
        </button>
      </div>
      <div className="px-10 mt-10">
        <div class="shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Starting Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sc &&
                sc.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.departure}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.stations}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.days}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.startingTimes}</td>
                    
                      {/* Update and Delete buttons */}
                    <td class="px-1 py-4 w-full justify-center flex gap-4">
                      <button
                        className="font-medium text-yellow-300 hover:text-yellow-100"
                        onClick={() => {
                          UpdateData(item.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      <a
                        href="#"
                        class="font-medium"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this Booking ?"
                            )
                          ) {
                            deleteItem(item.id);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-red-500 hover:text-red-100"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </a>
                    
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              // Handle update logic here
              // You can access the updated values in the `values` object
              console.log("Updated values:", values);
              setIsOpen(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex gap-4">
                  <div className="flex-col w-full">
                    <div className="ll">
                      <p className="font-semibold">Train departure</p>
                    </div>
                    <div className="ll">
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="departure"
                      />
                    </div>
                  </div>
                  <div className="flex-col w-full">
                    <div className="ll">
                      <p className="font-semibold">Train destination</p>
                    </div>
                    <div className="ll">
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="designation"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col w-full">
                    <div className="ll">
                      <p className="font-semibold">Train stations</p>
                    </div>
                    <div className="ll">
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="stations"
                      />
                    </div>
                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
                      name="stations"
                    />
                  </div>
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    <p className="font-semibold">Train days</p>
                  </div>
                  <div className="ll">
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="days"
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="days"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    <p className="font-semibold">Starting times</p>
                  </div>
                  <div className="ll">
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="startingTimes"
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="startingTimes"
                  />
                </div>
                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </section>
  );
}
