/** @format */

import * as React from "react";
const BaseballIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={10} stroke="#fff" strokeWidth={1.5} />
    <path
      stroke="#fff"
      strokeDasharray="1 3"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12.315 19.5a10.019 10.019 0 0 1 6.97-7.127m-8-8a10.019 10.019 0 0 1-6.97 7.127"
    />
  </svg>
);
export default BaseballIcon;
