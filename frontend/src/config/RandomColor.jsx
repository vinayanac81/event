let colors = [
  "#581845",
  "#00FFFF",
  "#FFC300",
  "#FF5733",
  "#C70039",
  "#900C3F ",
  "#0000FF",
  "#394236",
  "#3FC2C0",
  "#9B9917",
  "#7F2E21"
];

export const RandomColorPicker = () => {
  let randomColor = Math.floor(Math.random() * colors.length);
//   console.log(randomColor);
  return colors[randomColor];
};
// let randomColor=Math.floor(Math.random()*colors.length)

// let colors = [
//     "#581845",
//     "#00FFFF",
//     "#FFC300",
//     "#FF5733",
//     "#C70039",
//     "#900C3F ",
//     "#0000FF",
//   ];
