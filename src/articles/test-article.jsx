import React from "react";
import hero from "../images/universe.png";

export default function TestArticle({Renderer, ...props}) {
	return (
		<Renderer
			heroPhoto={hero}
			title="Test article"
			{...props}
		>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
				ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.
			</p>
			<p>paragraph two</p>
			<p>paragraph three</p>
			<p>if it wasn't clear already, this is a placeholder until I have some real articles</p>
		</Renderer>
	);
}
