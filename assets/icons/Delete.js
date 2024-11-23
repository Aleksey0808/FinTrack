import React from "react";
import { SvgCss } from 'react-native-svg/css';

const Delete = () => {
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
      d="M4 7h16M6 7v11a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9z"
    ></path>
  </svg>`
     return <SvgCss xml={xml} />
 }
 

export default Delete;