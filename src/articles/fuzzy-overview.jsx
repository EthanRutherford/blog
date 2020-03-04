import React, {useState} from "react";
import hero from "../images/fuzzy.png";
import styles from "../styles/fuzzy";

function renderResult(result) {
	const pre = result.item.slice(0, result.match.index);
	const match = result.item.slice(result.match.index, result.match.index + result.match.length);
	const post = result.item.slice(result.match.index + result.match.length);

	return (
		<div className={styles.resultRow}>
			<div>{pre}<b style={{color: "green"}}>{match}</b>{post}</div>
			<div>score {result.score}</div>
		</div>
	);
}

function SearchPanel({useLazyData}) {
	const [result, setResult] = useState({list: [], time: 0});
	const searcher = useLazyData(async () => {
		const {Searcher} = await import("fast-fuzzy");
		const {words} = await import("./1000");

		return new Searcher(words, {returnMatchData: true});
	});

	const first20 = result.list.slice(0, 20);

	return (
		<div>
			<h4>Top 1000 english words</h4>
			<input
				className={styles.searchInput}
				placeholder="start typing to search"
				onChange={(event) => {
					if (event.target.value === "") {
						setResult({list: [], time: 0});
					} else {
						const start = performance.now();
						const list = searcher.search(event.target.value);
						setResult({list, time: performance.now() - start});
					}
				}}
			/>
			<h5>Results: ({result.time}ms)</h5>
			<div className={styles.searchResults}>
				{result.list.length > 0 ? first20.map(renderResult) : "no results"}
				{result.list.length > 20 && "..."}
			</div>
		</div>
	);
}

export default function FuzzyOverview({Renderer, ...props}) {
	return (
		<Renderer
			heroPhoto={hero}
			title="Writing fast-fuzzy - Overview"
			mdjsx
			{...props}
		>
			fast-fuzzy is an npm package that I wrote for doing fast client-side autocomplete
			from a predetermined list of options. Example usages include searching a list
			of usernames, emoji, or even spell checking auto-correct and auto-suggest.
			This series of articles will go over the design, implementation, and evolution
			of the package.

			fast-fuzzy is indeed quite fast, as it was designed to be able to search
			reasonably large sets of search candidates in real time, as the user types.
			You can try it out below: the top 1000 english words are scored, sorted, and
			returned in milliseconds. On a fast enough machine, after the js engine optimizes
			the functions, the searches actually drop to sub-millsecond. The results are
			rendered quickly enough that, to the user, it appears instantaneous.

			<SearchPanel useLazyData={Renderer.useLazyData} />

			fast-fuzzy wasn't always so fast, though. The first iteration of the package
			bruteforced the full list, and many of the options that the package now supports
			didn't exist. As I started to use the package for more varied use cases, often
			with much larger datasets than the original use case, I gradually improved the
			performance, and added new options.

			The first article in this series will cover the design of the underlying
			algorithm, and the earliest optimizations I made to handle larger datasets.

			* **[Writing fast-fuzzy - Overview](/#fuzzy-overview)**
			* **Writing fast-fuzzy - Part 1** (coming soon)
		</Renderer>
	);
}
