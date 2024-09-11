/** @format */

import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col gap-10 lg:gap-10 items-center justify-center text-center lg:text-start lg:items-center">
      <div className="font-extrabold text-4xl text-white lg:text-7xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-center w-full">
        <div className="relative inline-block text-center">
          <span className="absolute bg-primary-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
          <span className="relative text-neutral">AI Betting picks</span>
        </div>
      </div>
      <div className="w-full">
        <h1 className="font-extrabold text-4xl text-white lg:text-7xl tracking-tight md:-mb-4 flex flex-col items-center lg:items-center">
          <span className="relative text-center uppercase lg:items-center lg:text-center">
            Sports Betting{" "}
            <span className="football_emoji inline-block -translate-x-4 lg:-translate-x-8 bg-no-repeat bg-contain align-middle">
              {" "}
            </span>
          </span>
          <span className="block uppercase text-center lg:text-center">
            <span className="money_emoji inline-block translate-x-3 bg-no-repeat bg-contain align-middle"></span>
            made easy with <span className="text-primary-500">AI</span>
          </span>
        </h1>
      </div>
      <p className="text-primary-textGrey uppercase text-bold text-xl lg:text-3xl">
        Real Sport Betting analysis made easy
      </p>
      <button className="basis-auto shrink-0 font-common mobile_sign-up md:hidden">
        Sign Up
      </button>
      <button className="font-common sign-up">Sign Up</button>
    </div>
  );
}
