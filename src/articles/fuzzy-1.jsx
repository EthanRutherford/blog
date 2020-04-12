import React from "react";
import hero from "../images/fuzzy.png";

export default function Fuzzy1({Renderer, ...props}) {
	return (
		<Renderer
			heroPhoto={hero}
			title="Writing fast-fuzzy - Part 1"
			mdjsx
			{...props}
		>
			fast-fuzzy is an npm package that I wrote for doing fast client-side autocomplete
			from a predetermined list of options. Example usages include searching a list
			of usernames, emoji, or even spell checking auto-correct and auto-suggest.
			This is part one of a series of articles which goes over the design,
			implementation, and evolution of the package.

			fast-fuzzy wasn't particularly fast when I first published it, the title was
			more aspirational than anything. It was perfectly quick enough for small sets
			of search candidates, which is what I was using it for in the beginning, and
			perhaps most importantly it was *tiny*. Even in its current form, the package
			is significantly smaller than many other similar packages. The original file
			was *just 75 lines long*.

			### Do one thing, and do it well

			There's a clever joke about a guy in a job interview.\
			The interviewer asks "It says here on your resume that 'quick math' is one of your
			strengths. Mind if I shoot off a few math problems?"\
			To which, the interviewee agrees.\
			"14 * 36"\
			"104"\
			"7 * 41"\
			"120"\
			"221 / 40"\
			"11"\
			The interviewer raises an eyebrow, "None of those answers were even *close*"\
			"Yeah, but they were quick."

			Clearly, all the speed in the world is pointless if the answer you give is not
			useful. In the beginning, I focused on accuracy over speed or configurability.
			By forgoing configurable optional features, and not worrying about speed, I could
			focus on making the core fuzzy-search behavior give as useful results as possible.

			The scoring method is a modification of levenshtein distance calculation I read about
			in a [paper by Peter H. Sellers](https://www.semanticscholar.org/paper/The-Theory-and-Computation-of-Evolutionary-Pattern-Sellers/0517aa6d420f66f74bd4b281e2ed0e2021f3d359).
			Via a simple modification, changing the initial row in a levenshtein matrix from
			`0, 1, 2, 3, 4...` to `0, 0, 0, 0, 0...` and then using the best value from the
			final row instead of the last value of the final row, the algorithm instead finds
			partial matches. All of the steps in-between remain the same as standard levenshtein,
			so the runtime characteristics are identical, but the score now represents the score
			of the *substring* of the candidate which best matches the input term.

			For example, a candidate of "catherine" would give a perfect match for search term
			of "cat", or "the", but only a 2/3 match for "rim".

			In addition, early on I added support for the [damerau-levenshtein](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance)
			variation, which handles transpositions better. Many common typos are transpositions,
			such as inverting `i` and `e`, or simply pressing keys out of order. Under typical
			levenshtein, two letters that are in the wrong order would count as a distance of 2,
			but in damerau, this counts as only 1.

			The damerau variation is compatible with the sellers modification, and has
			the same runtime characteristics. By constraining the check to only adjacent
			transposed characters, we end up only adding one additional check into the inner
			loop of the algorithm.

			With this foundation, I had a base which could search for fuzzy substring matches,
			perfect for fuzzy-autocomplete from a predetermined set of search candidates.
			However, the library was only suited to searching fairly small sets of data in
			realtime, as-you-type. Larger sets would take too long and cause the main thread
			to hang. The next article will cover the optimizations I made to allow for much
			larger datasets.

			**[overview](/#fuzzy-overview)**
			**next article** (coming soon)
		</Renderer>
	);
}
