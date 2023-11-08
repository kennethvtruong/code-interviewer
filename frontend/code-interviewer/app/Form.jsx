"use client";
import React from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Form({
  userName,
  roomName,
  handleUsernameChange,
  handleRoomNameChange,
  handleSubmit,
}) {
  //   const roomNameRef = useRef(null);
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!usedRooms.has(roomNameRef.current?.value)) {
  //       setForm({
  //         ...form,
  //         roomName: roomNameRef.current?.value,
  //       });
  //     }

  //     console.log(form);
  //   };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm md:w-1/2">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-250">
          Find a Room
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-250"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="username"
                value={userName}
                onChange={handleUsernameChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-250"
              >
                Room
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2 mr-2">
              <input
                id="roomName"
                name="password"
                type="text"
                value={roomName}
                autoComplete="room-name"
                onChange={handleRoomNameChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-5 indent-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Join Room
            </button>
          </div>
        </form>

        {/* <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p> */}
      </div>
    </div>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="name">Name:</label>
    //       <input
    //         className="form-input"
    //         type="text"
    //         id="field"
    //         value={userName}
    //         onChange={handleUsernameChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="room">Room name:</label>
    //       <input
    //         className="form-input"
    //         //   style={error ? { color: 'red' } : {}}
    //         type="text"
    //         id="roomName"
    //         value={roomName}
    //         onChange={handleRoomNameChange}
    //         required
    //         //   defaultValue={new Date('01-01-1900').toISOString().split('T')[0]}
    //       />
    //     </div>
    //     <Button
    //       className="Button"
    //       type="submit"
    //       variant="contained"
    //       startIcon={<SendIcon />}
    //     >
    //       Submit
    //     </Button>
    //   </form>
    // </div>
  );
}
