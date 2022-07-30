import en from "./en.json";
import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";

addMessages("en", en);

const initLocale = () => {
	init({
		fallbackLocale: "en",
		initialLocale: getLocaleFromNavigator()
	});
};

export default initLocale;