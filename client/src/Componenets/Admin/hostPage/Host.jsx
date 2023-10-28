import React, { useEffect, useState } from "react";
import { host } from "../../../services/admin-Service";

function Host() {
  const [hosts, setHosts] = useState([]);
  useEffect(() => {
    host().then((res) => {
      if (res.data.hosts) {
        setHosts(res.data.hostData);
      } else {
        setHosts([]);
      }
    });
  }, [hosts]);
  return (
    <main className="flex-1  p-5 overflow-x-auto w-full">
      {/* Your main content goes here */}
      <div className=" transition-colors">
        <h1 className="text-2xl font-semibold  mb-8 mt-6 border-gray-800 ">
          HOSTS
        </h1>
      </div>
      {/* Other components and content */}
      <div className="overflow-x-auto mt-16">
        <table className="min-w-full rounded-lg overflow-hidden bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Mobile
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Cars
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                status
              </th>

              {/*           
            {/* ... Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {hosts.map((host) => (
              <tr key={host._id}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {host.name}{" "}
                </td>

                <td className="py-2 px-4 border-b border-gray-300">
                  {host.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {host.mobile}
                </td>

                <td className="py-2 px-4 border-b border-gray-300">
                  {host.is_car ? "Available" : "Not Available"}
                </td>

                <td className="py-2 px-4 border-b border-gray-300">
                  {host.is_verified ? (
                    <button
                      onClick={() => handleVerifyHost(host._id)}
                      className={`bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded`}
                    >
                      Block Host
                    </button>
                  ) : (
                    <h1 className="text-yellow-500" >Not verified</h1>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Host;
