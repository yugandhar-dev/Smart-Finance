import { Button } from "@material-ui/core";
import React, { useRef, useEffect } from "react";

const { tableau } = window;

function Tablembed(props) {
	const ref = useRef(null);

    const url = "https://public.tableau.com/views/InvestmentTrend_16100204527940/Dashboard1?:language=en&:display_count=y&:origin=viz_share_link";

	const options = {
		device: "desktop",
	};

	function initViz() {
		new tableau.Viz(ref.current, url);
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
			<p> Trends of User Investments </p>
			<div ref={ref}></div>
		</div>
	);
}

export default Tablembed;
