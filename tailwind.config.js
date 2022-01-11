module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        playfair: ["Playfair Display"],
      },
      colors: {
        1: "#0066F5",
        2: "#022B69",
        3: "#7A889E",
        4: "#F4F7FA",
        5: "rgba(0, 102, 245, 0.5)",
        6: "#E8F0FE",
        7: "#D1DDEE",
        8: "rgba(0,0,0,0.5)",
        9: "rgba(0, 102, 245, 1)",
        10: "#B4CAE7"
      },
      borderRadius: {
        nubrad: "0px 0px 0px 8px"
      }
    },
  },
  plugins: [],
};
