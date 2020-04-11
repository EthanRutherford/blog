import React, {useLayoutEffect} from "react";

export function DisqusSection({articleId}) {
	useLayoutEffect(() => {
		function config() {
			// eslint-disable-next-line react/no-this-in-sfc
			this.page.url = `https://blog.rutherford.site/#${articleId}`;
			// eslint-disable-next-line react/no-this-in-sfc
			this.page.identifier = articleId;
		}

		if (window.DISQUS == null) {
			// eslint-disable-next-line camelcase
			window.disqus_config = config;

			const script = document.createElement("script");
			script.src = "https://ethan-dev.disqus.com/embed.js";
			script.setAttribute("data-timestamp", Date.now());
			document.head.appendChild(script);
		} else {
			window.DISQUS.reset({reload: true, config});
		}
	}, [articleId]);

	return (
		<div id="disqus_thread" />
	);
}
