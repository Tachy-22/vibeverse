/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        profile: "url('./assets/profile.jpg')",
        home: "url('./assets/footer-texture.png')",
        error: "url('./assets/error.jpg')",
        signUp: "url('./assets/homeBg3.jpg')",
        errorsvg: "url('./assets/404.png')",
      },
    },
  },
  plugins: [],
};
