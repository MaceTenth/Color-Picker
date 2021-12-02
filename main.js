window.addEventListener("DOMContentLoaded", (event) => {
  let inputs = document.querySelectorAll("input");

  let container = document.querySelector(".container");

  let colorValue = document.querySelector("p");
	#values
  let values = {
    red: 255,
    green: 255,
    blue: 255,
    opacity: 100,
  };

  inputs.forEach((input) =>
    input.addEventListener("input", function (event) {
      let label = event.target.previousElementSibling;
      values[event.target.id] = event.target.value;

      let colors = `rgba(${values.red},${values.green},${values.blue},${
        values.opacity / 100
      })`;
      console.log(colors);
      container.style.backgroundColor = colors;

      if (lightOrDark(container.style.backgroundColor) === "dark") {
        container.style.color = "white";
      } else {
        container.style.color = "black";
      }

      label.innerText = `${event.target.id}: ${
        event.target.id === "opacity"
          ? event.target.value / 100
          : event.target.value
      }`;

      colorValue.innerText = `Current color value: ${colors}`;
    })
  );
});

console.log("outside window");

function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
}
