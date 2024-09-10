/** @format */

import React from "react";

export default function Pricing() {
  const pricing = [
    {
      id: 1,
      title: "E-Commerce",
      price: 1500,
      user: "E-Commerce",
      features: [
        "Complete documentation",
        "Custom Designed",
        "Custom Shopify theme",
        "Easy to edit",
      ],
    },
    {
      id: 2,
      title: "Business",
      price: 150,
      user: 5,
      features: [
        "Unlimited Edits",
        "Includes Hosting",
        "24/7 Customer Service",
        "Lifetime Updates",
      ],
    },
    {
      id: 3,
      title: "Logos & Designs",
      price: 0,
      user: 100,
      features: [
        "Included in any package",
        "All file formats",
        "Ready to use",
        "Free w/ Subscription",
      ],
    },
  ];

  return (
    <>
      {/* Start */}

      <section className="relative md:py-24 py-16" id="pricing">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h6 className="text-orange-600 text-base font-medium uppercase mb-2">
              Pricing
            </h6>
            <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">
              Comfortable Rates
            </h3>

            <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">
              Acquire a new website for your business without breaking the bank.
            </p>
          </div>

          <div className="flex flex-wrap">
            {pricing.map((item, key) => (
              <div
                className="w-full md:w-1/2 lg:w-1/3 px-0 md:px-3 mt-8"
                key={key}
              >
                <div className="flex flex-col pt-8 pb-8 bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-black rounded-md shadow shadow-slate-200 dark:shadow-slate-700 transition duration-500">
                  <div className="px-8 pb-8">
                    <h3 className="mb-6 text-lg md:text-xl font-medium dark:text-white">
                      {item.title}
                    </h3>
                    <div className="mb-6 dark:text-white/70">
                      <span className="relative -top-5 text-2xl">$</span>
                      <span className="text-5xl font-semibold dark:text-white">
                        {item.price}
                      </span>
                      {key !== 0 && (
                        <span className="inline-block ms-1">/ month</span>
                      )}
                    </div>
                    {key !== 2 ? (
                      <p className="mb-6 text-slate-430 dark:text-slate-300">
                        Essential features for your {item.user} website
                      </p>
                    ) : (
                      key === 2 && (
                        <p className="mb-6 text-slate-430 dark:text-slate-300">
                          Custom designs for your website
                        </p>
                      )
                    )}
                    <a
                      href="#contact"
                      className="btn bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-md w-full"
                    >
                      Get in touch
                    </a>
                  </div>
                  <div className="border-b border-slate-200 dark:border-slate-700"></div>
                  <ul className="self-start px-8 pt-8">
                    {item.features.map((subitem, index) => (
                      <li
                        className="flex items-center my-1 text-slate-400 dark:text-slate-300"
                        key={index}
                      >
                        <i className="uil uil-check-circle text-lg text-green-600 me-1"></i>
                        <span>{subitem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-center text-slate-400 dark:text-slate-300 mt-2"><span className="text-orange-600">*</span>No credit card required</div> */}
        </div>
      </section>
    </>
  );
}
