// postcss.config.mjs
import tailwindPlugin from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindPlugin(), autoprefixer()],
};
