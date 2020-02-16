import React from "react";
import hero from "../images/universe.png";

export default function WelcomeArticle({Renderer, ...props}) {
	return (
		<Renderer
			heroPhoto={hero}
			title="Welcome to my blog"
			{...props}
		>
			<p>
				Hello, and welcome to my blog!
			</p>
		</Renderer>
	);
}
