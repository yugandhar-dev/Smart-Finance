import React, { useRef, useEffect } from 'react';
 
const { tableau } = window;
 
 function Tablembed() {
   const ref = useRef(null)
   
   const url = "https://public.tableau.com/views/userdashboard/userdashboard"
 
   const options = {
       device: "desktop"
   }
   
  function initViz() {
   new tableau.Viz(ref.current, url)
 }
 
 useEffect(() => {
   initViz();
 },[])
      return  (<div>
        <p> Trends of Low Risk Investments </p>
        <div ref={ref}></div>
        </div>)
 }
 
export default Tablembed;