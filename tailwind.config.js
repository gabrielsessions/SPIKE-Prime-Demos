const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js}",
            "./index.html",
            "./demoList.html",
            ],
  theme: {
    extend: {
      colors: {
        'tufts-blue': '#3E8EDE',
        'tufts-darker-blue': '#497EB3',
      },
      backgroundImage: {
        'homepage': 'url("../img/geometricBG.jpg")',
      },
    },
  },
  plugins: [],
}

//Build command
//npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
