import React, { useState } from "react";


const Home = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");



  const subtmitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="h-screen relative">
      <img
        className="w-20 absolute left-5 top-5 "
        src="assets/logo.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* {temportatu image} */}
        <img
          className="object-cover h-full w-full"
          src="assets/map.png"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="p-5 bg-white ">
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Add a drop-off location"
            />
          </form>
        </div>
        <div className="bg-red-500 p-5 h-[70%]"></div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Home;
