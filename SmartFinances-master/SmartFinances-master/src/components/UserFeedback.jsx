import React,{ useRef, useEffect } from "react";

const { tableau } = window;

function Tablembed(props) {
	const ref = useRef(null);

	const url = "https://public.tableau.com/views/admin_final/Dashboard1";
	
	

	const options = {
		device: "desktop",
	};

	function initViz() {
		new tableau.Viz(ref.current, url,options);
	}

	useEffect(() => {
		initViz();
	}, []);
	return (
		<div>
			<p><h1>User Feedback</h1></p>
			<div ref={ref}></div>
		</div>
	);
}

export default Tablembed;

