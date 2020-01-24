import React from "react";
import {render} from "react-dom";
import "./styles/reset";

function App() {
	return (
		<div>Hello World!</div>
	);
}

render(<App />, document.getElementById("react-root"));
