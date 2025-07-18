import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "300px",
      md: "400px",
      lg: "880px",
      tablet: "1024px",
    },
    extend: {
      fontFamily: {
        RoboNormal: "Roboto-Regular",
        RoboMedium: "Roboto-Medium",
        RoboBold: "Roboto-Bold",
      },
      colors: {
        primary:"#1976D2",
        title: "#272727",
        subT: "#5e5e5e",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".btn": {
  padding: "3px",
  borderRadius: "10px",
  textTransform: "uppercase",
  backgroundColor: "#333",
}
,
        ".resize-repeat": {
          resizeMode: "repeat",
        },
      });
    }),
  ],
};

export default config;
