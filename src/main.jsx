import React from "react";
import {render} from "react-dom";
import styles from "./styles/root";
import "./styles/reset";

function App() {
	return (
		<div className={styles.mainContent}>
		<header className={styles.header}>bleg</header>
			hello werld
		</div>
	);
}

render(<App />, document.getElementById("react-root"));
