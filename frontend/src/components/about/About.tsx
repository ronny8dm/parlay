/** @format */

import React, { useState } from "react";
import demo from "../../assets/videos/demo.mov";
import poster from "../../assets/images/demo-poster.png";
import "./About.css";

export default function About() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <section
        className="relative md:py-24 py-16  shadow-xl shadow-primary-500"
        id="about"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <video
                  src={demo}
                  className="rounded-lg shadow-lg relative"
                  controls
                  playsInline
                  preload="auto"
                  loop
                  poster={poster}
                ></video>
              </div>
            </div>
            {/* end col */}

            <div className="lg:col-span-7">
              <div className="lg:ms-7">
                <h6 className="text-primary-500 text-base font-medium uppercase mb-2">
                  Who We Are ?
                </h6>
                <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">
                  We help businesses like yours
                </h3>

                <p className="text-slate-400 dark:text-slate-300 max-w-2xl mx-auto">
                  We specialize in custom web design and development for small
                  businesses anywhere in the UK. Our team meticulously
                  hand-codes each website to ensure optimal performance, helping
                  to attract more customers to your site and generate increased
                  revenue for your business.
                </p>

                <div className="relative mt-10">
                  <button className="basis-auto shrink-0 font-common mobile_sign-up md:hidden">
                    Sign Up
                  </button>
                  <button className="font-common sign-up">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
