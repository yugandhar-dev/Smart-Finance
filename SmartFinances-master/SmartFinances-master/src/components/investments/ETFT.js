import { Button } from "@material-ui/core";
import React, { useRef, useEffect } from "react";

const { tableau } = window;

function Tablembed(props) {
	const ref = useRef(null);

	const url = "https://public.tableau.com/views/iteration1_dashboard_final/Dashboard1";
	

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
			<Button
				onClick={() => props.setStatus(null)}
				type='submit'
				variant='contained'
				color='primary'
				className={props.classes.submit}
			>
				Back
			</Button>
			<p><h1>Investment Analysis</h1></p>
			<div ref={ref}></div>
		</div>
	);
}

export default Tablembed;
