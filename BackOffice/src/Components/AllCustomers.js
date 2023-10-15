import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Switch from "react-switch";

export default function AllCustomers() {
  const [items, setItems] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:5003/api/User/GetAllUsers")
      .then((response) => {
        if (response) {
          let temp = [];
          response.data.forEach((element) => {
            if (element.active) {
              temp.push(element);
            }
          });
          setItems(temp);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleActive = (status, model) => {
    model.active = status;
    console.log(model);
    axios
      .put("http://localhost:5003/api/User/UpdateUser?id=" + model.id, model)
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {});
  };

  return (
    <section className="p-6">
      <div className="shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIC
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activate / Deactivate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {items && items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.fName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.lName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.mobile}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.nic}</div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {item.active ? (
                      <button
                        onClick={() => {
                          handleActive(false, item);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleActive(true, item);
                        }}
                        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      
    </section>
  );
}
