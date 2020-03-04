import React from "react";
import hero from "../images/universe.png";

export default function WelcomeArticle({Renderer, ...props}) {
	return (
		<Renderer
			heroPhoto={hero}
			title="Welcome to my blog"
			mdjsx
			{...props}
		>
			Hello, and welcome to my blog!

			My name is Ethan Rutherford. This blog will be used for making blogs.

			I think that's pretty cool, don't you?
			\
			\
			Yeah probably.
			\
			\
			\
			\
			\
			But maybe not.
		</Renderer>
	);
}
