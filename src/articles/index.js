import {TestArticle} from "./test-article";

export const articles = [
	TestArticle,
];

export const articleMap = articles.reduce((map, article) => {
	map[article.id] = article;
	return map;
}, {});
