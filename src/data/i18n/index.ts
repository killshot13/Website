import en from "./en.json";
import he from "./he.json";
import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";

addMessages("en", en);
addMessages("he", he);

const initLocale = () => {
	init({
		fallbackLocale: "en",
		initialLocale: getLocaleFromNavigator()
	});
};

export default initLocale;