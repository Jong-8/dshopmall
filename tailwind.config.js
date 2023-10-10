module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   advent: "'Advent Pro'",
    //   goldman: "'Goldman'",
    //   Montserrat: "'Montserrat'",
    //   poppins: "Poppins",
    //   noto: "'Noto Sans KR'",
    // },
    fontFamily: {
      //  advent: "'Advent Pro'",
      //  goldman: "'Goldman'",
      //  Montserrat: "'Montserrat'",
      //  poppins: "Poppins",
      //  noto: "'Noto Sans KR'",
      jamsilRegular: "TheJamsilRegular",
      jamsilMedium: "TheJamsilMedium",
      jamsilBold: "TheJamsilBold",
      jamsilExtraBold: "TheJamsilExtraBold",
    },
    extend: {
      flex: {
        4: "4",
        1: "1",
      },
      boxShadow: {
        line: "0px 12px 30px 5px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
