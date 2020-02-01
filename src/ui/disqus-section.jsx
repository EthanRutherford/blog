import React, {useLayoutEffect} from "react";

export function DisqusSection({articleId}) {
	useLayoutEffect(() => {
		// eslint-disable-next-line camelcase
		window.disqus_config = function() {
			this.page.url = "blog.rutherford.site";
			this.page.identifier = articleId;
		};

		const script = document.createElement("script");
		script.src = "https://ethan-dev.disqus.com/embed.js";
		script.setAttribute("data-timestamp", Date.now());
		document.head.appendChild(script);
	}, [articleId]);

	return (
		<div id="disqus_thread" />
	);
}
