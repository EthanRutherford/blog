import {pins, list} from "./article.list";

export {pins, list};
export const articleMap = pins.concat(list).reduce((map, article) => {
	map[article.id] = article;
	return map;
}, {});
