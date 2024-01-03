import { DatePicker } from "antd";
import Image from "next/image";
import React from "react";

export default function Detail({
  params,
}: {
  params: { id: string; query: any };
}) {
  return (
    <div className="container flex flex-col h-full justify-center items-center lg:py-[30px]">
      <div className="flex flex-col h-1/2 justify-center items-center lg:py-[20px">
        <h1 className="text-2xl md:text-4xl font-bold mb-10">name</h1>
        <p className="text-center md:max-w-1/3 break-words">
          The Mountain Room is available with either double or single beds.
          Designed in an open-concept living area, it comes with oversized
          windows and lots of in-room facilities.
        </p>
      </div>
      <hr className="container my-10" />
      <div className="container relative h-[400px] bg-slate-100 flex justify-center items-center">
        <Image
          fill
          className="object-cover object-center w-full h-full"
          alt="pic"
          src={""}
        />
      </div>
      <hr className="container my-10" />
      <div className="container flex flex-col md:flex-row ">
        <div className="flex-[2]">
          <p>description</p>
          {/**Detail */}
          <div className="flex-col lg:flex-row flex container min-h-[300px] border-[1px] p-5 my-10 lg:justify-between">
            <h2 className="flex-[1] text-center text-2xl font-bold">Details</h2>
            <div className="flex-[3] h-1/3 border-t-[1px] lg:h-full lg:px-10 lg:border-l-[1px] lg:border-t-0">
              <ul>
                <li className="flex my-5 break-words">
                  <span className="text-[#767b80] w-1/4">Guest:</span>
                  <span className="w-3/4">1</span>
                </li>
                <li className="flex my-5 break-words">
                  <span className="text-[#767b80] w-1/4">Size:</span>
                  <span className="w-3/4"> 10</span>
                </li>
                <li className="flex my-5 break-words">
                  <span className="text-[#767b80] w-1/4">Location:</span>
                  <span className="w-3/4">city</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*Bill */}
        <div className="flex flex-1 justify-center container min-h-[700px] lg:ml-10">
          <div className="flex flex-1 flex-col min-h-[300px] max-h-[600px] border-[1px] p-5">
            <div className="flex flex-col justify-center h-1/4">
              <p className="text-xl">
                <span className="text-2xl">
                  <strong>€1</strong>
                </span>{" "}
                per Day
              </p>
            </div>
            <hr />
            <div className="h-3/4">
              <div className="flex flex-col my-5 ">
                <p className="text-sm font-semibold">Check-in Date*</p>
                {<DatePicker size="large" format="YYYY-MM-DD" />}
              </div>
              <div className="flex flex-col my-5 ">
                <p className="text-sm font-semibold">Check-out Date*</p>
                {<DatePicker size="large" format="YYYY-MM-DD" picker="date" />}
              </div>
              <div className="my-5 break-word">
                {/* <p className="text-red-500">message error</p> */}
              </div>
              <p className="text-xl my-5">
                <span className="text-2xl">
                  <strong>€ 1</strong>
                </span>{" "}
                for 1 days
              </p>
              <button className="w-full max-w-[150px] h-[50px] bg-slate-200">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
