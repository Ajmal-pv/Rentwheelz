import React, { useEffect, useState } from "react";
import { unblockUser, user, userBlock } from "../../../services/admin-Service";
import Swal from "sweetalert2";
function User() {
  const [verificationDone, setVerificationDone] = useState(false);
  const handleUnBlockUser = (userId) => {
    Swal.fire({
      title: "Unblock User",
      text: "Are you sure you want to unblock this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Unblock",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API to unblock the user here
        unblockUser(userId)
          .then((response) => {
            if (response.data.userUnBlock) {
              Swal.fire(
                "Unblocked!",
                "The user has been unblocked.",
                "success"
              );
              // You can also update your component's state or perform any other necessary actions
            } else {
              Swal.fire("Error", response.data.message, "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error", `An error occurred: ${error.message}`, "error");
          });
      }
    });
  };
  const handleBlockUser = (userId) => {
    Swal.fire({
      title: "Block User",
      input: "text",
      inputLabel: "Reason for Blocking",
      inputPlaceholder: "Enter reason here...",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage(
            "Please enter a reason for blocking the user"
          );
        } else {
          return userBlock(userId, reason)
            .then((response) => {
              if (response.data.userBlock) {
                return response.data.message;
              } else {
                throw new Error(response.data.message);
              }
            })
            .catch((error) => {
              Swal.showValidationMessage(`Error: ${error.message}`);
            });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Blocked!", result.value, "success");
        // You can also update your component's state or perform any other necessary actions
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Blocking operation cancelled", "error");
      }
    });
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    user().then((res) => {
      if (res.data.users) {
        setUsers(res.data.userData);
      } else {
        setUsers([]);
      }
    });
  }, [users, handleBlockUser, handleUnBlockUser]);
  return (
    <main className="flex-1 p-4 overflow-x-hidden">
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
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Action
              </th>

              {/*           
              {/* ... Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.name}{" "}
                </td>

                <td className="py-2 px-4 border-b border-gray-300">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.mobile}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.subscribed_cars ? "Available" : "No cars"}
                </td>
                <td
                  className="py-2 px-4 border-b border-gray-300"
                  style={{ color: user.is_blocked ? "red" : "green" }}
                >
                  {user.is_blocked ? "Blocked" : "Active"}
                </td>

               
                {user.is_blocked ? (
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleUnBlockUser(user._id)}
                      className={`bg-orange-500 text-white hover:bg-orange-700 py-1 px-3 rounded`}
                    >
                      UnBlock User
                    </button>
                  </td>
                ) : (
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className={`bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded`}
                    >
                      Block User
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default User;
