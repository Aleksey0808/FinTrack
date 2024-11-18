import React from "react";
import { SvgCss } from 'react-native-svg/css';

const MoonDark = () => {
    const xml = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="#1C274C"
      d="M12 22c5.523 0 10-4.477 10-10 0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10"
    ></path>
  </svg>`
     return <SvgCss xml={xml} />
 }
 

export default MoonDark;