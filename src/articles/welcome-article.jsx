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
			<p>
				My name is Ethan Rutherford. This blog will be used for making blogs.
			</p>
			<p>
				I think that's pretty cool, don't you?
			</p>
			<p>
				Yeah probably.
			</p>
			<br />
			<br />
			<p>
				But maybe not.
			</p>
		</Renderer>
	);
}
