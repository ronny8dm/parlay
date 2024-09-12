/** @format */

import React from "react";
import { Link } from "react-router-dom";
import footballContainer from "../../assets/images/football-container.png";
import barChart from "../../assets/images/bar-chart.png";
import moneyBag from "../../assets/images/money-bag.png";

export default function Features() {
  const team = [
    {
      title: "Hosting Fees Included",
      icon: "server",
      subtext: "The monthly payment includes hosting fees.",
    },
    {
      title: "24/7 Customer Service",
      icon: "clock-three",
      subtext:
        "You can reach a real person by calling us directly anytime, day or night, without navigating phone trees or dealing with automated responses.",
    },
    {
      title: "Unlimited Edits",
      icon: "edit",
      subtext:
        "You can request a change at any time, and it will be completed the same day.",
    },
    {
      title: "Web Design & Development",
      icon: "desktop",
      subtext:
        "We provide more than 40 hours of design, development, and testing.",
    },
    {
      title: "100 Google Page Speed Score",
      icon: "tachometer-fast-alt",
      subtext:
        "We can attain a flawless score of 100 on Google Page Speed, enhancing your search engine ranking.",
    },
    {
      title: "Google Analytics",
      icon: "chart-bar",
      subtext:
        "We offer complimentary installation of Analytics to track traffic origins and volume.",
    },
  ];

  return (
    <>
      {/* Start */}
      <section className="relative md:py-24 py-16 active" id="features">
        <div className="container lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 pb-8 items-center">
            <div>
              <h6 className="text-primary-500 text-base font-medium uppercase mb-2">
                What We Do ?
              </h6>
              <h3 className="mb-4 md:text-2xl text-xl font-semibold dark:text-white md:mb-0">
                Perfect Solution For Your <br /> Business
              </h3>
            </div>

            <div>
              <p className="text-slate-400 dark:text-slate-300 max-w-xl">
                Unlike most development agencies, we hand-code each line
                meticulously rather than relying on WordPress, frameworks, or
                page builders.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {team.map((item, key) => (
              <div
                key={key}
                className={`features p-6 ${
                  key % 2 === 0
                    ? "hover:shadow-xl hover:shadow-primary-500 dark:hover:shadow-primary-500"
                    : "shadow-xl shadow-primary-500 dark:shadow-primary-500"
                } transition duration-500 rounded-3xl mt-8`}
              >
                <div className="w-20 h-20 bg-primary-500 text-white rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm">
                  <i className={`uil uil-${item.icon}`}></i>
                </div>

                <div className="content mt-7">
                  <Link
                    to="#"
                    className="text-lg hover:text-primary-500 dark:text-white dark:hover:text-primary-500 transition-all duration-500 ease-in-out font-medium"
                  >
                    {item.title}
                  </Link>
                  <p className="text-slate-400 mt-3">{item.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h6 className="text-primary-500 text-base font-medium uppercase mb-2">
              Work Process
            </h6>
            <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">
              Digital System For Our Business
            </h3>

            <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">
              Launch your campaign and benefit from our expertise on designing
              and managing conversion centered Tailwind CSS html page.
            </p>
          </div>

          <div className="grid grid-cols-1 mt-8 -z-10">
            <div className="timeline relative">
              <div className="timeline-item ">
                <div className="grid sm:grid-cols-2">
                  <div className="">
                    <div className="duration date-label-left ltr:float-right rtl:float-left md:me-7 relative">
                      <img
                        src={footballContainer}
                        className="h-64 w-64"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="event event-description-right ltr:float-left rtl:float-right ltr:text-left rtl:text-right md:ms-7">
                      <h5 className="text-lg dark:text-white mb-1 font-medium">
                        Strategy
                      </h5>
                      <p className="timeline-subtitle mt-3 mb-0 text-slate-400">
                        We concentrate on realizing the optimal business,
                        software, and technology opportunities. As an engaged
                        team, we immerse ourselves in your business by
                        understanding your objectives and the significance of
                        software and systems in reaching those targets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item mt-5  pt-4">
                <div className="grid sm:grid-cols-2">
                  <div className="md:order-1 order-2">
                    <div className="event event-description-left ltr:float-left rtl:float-right ltr:text-right rtl:text-left md:me-7">
                      <h5 className="text-lg dark:text-white mb-1 font-medium">
                        Development
                      </h5>
                      <p className="timeline-subtitle mt-3 mb-0 text-slate-400">
                        We initiate the development of your website with a
                        mobile-first approach, subsequently enhancing it for
                        tablet and desktop use. Your site will be compatible
                        across all mobile screen sizes, tablets, and desktop
                        resolutions, ensuring new clients can access your site
                        from any location.
                      </p>
                    </div>
                  </div>
                  <div className="md:order-2 order-1">
                    <div className="duration duration-right md:ms-7 relative">
                      <img src={barChart} className="h-64 w-64" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item mt-5 pt-4">
                <div className="grid sm:grid-cols-2">
                  <div className="mt-4 mt-sm-0">
                    <div className="duration date-label-left ltr:float-right rtl:float-left md:me-7 relative">
                      <img src={moneyBag} className="h-64 w-64" alt="" />
                    </div>
                  </div>
                  <div className="mt-4 mt-sm-0">
                    <div className="event event-description-right ltr:float-left rtl:float-right ltr:text-left rtl:text-right md:ms-7">
                      <h5 className="text-lg dark:text-white mb-1 font-medium">
                        Launch
                      </h5>
                      <p className="timeline-subtitle mt-3 mb-0 text-slate-400">
                        Following the design, development, and testing stages,
                        we launch your website, making it accessible to all your
                        potential customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
