import React from "react";
import { SvgCss } from 'react-native-svg/css';

const Back = () => {
    const xml = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="9"
    height="16"
    fill="none"
    viewBox="0 0 9 16"
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.625"
      d="M7.938 1.5 1.438 8l6.5 6.5"
    ></path>
  </svg>`
     return <SvgCss xml={xml} />
 }
 

export default Back;