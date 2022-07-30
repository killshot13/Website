import { sveltekit } from "@sveltejs/kit/vite";
import compress from "vite-plugin-compression";
import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [sveltekit(), compress({ algorithm: "brotliCompress" })]
};

export default config;