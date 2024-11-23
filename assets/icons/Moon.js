import React from "react";
import { SvgCss } from 'react-native-svg/css';

const Moon = () => {
    const xml = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3.32 11.684a9 9 0 0 0 17.357 3.348A9 9 0 0 1 8.32 6.683c0-1.18.23-2.32.644-3.353a9 9 0 0 0-5.645 8.354"
    ></path>
  </svg>`
     return <SvgCss xml={xml} />
 }
 

export default Moon;