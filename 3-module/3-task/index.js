function camelize(str) {
  let strings = str.split('-');
  let arrayStrings = [];
  console.log(strings);

  strings.forEach((element, index) => {
    arrayStrings.push(element.slice(0, 1).toUpperCase() + element.slice(1));
  });

  let joinString = arrayStrings.join('');

  if (str.slice(0, 1) !== '-') {
    joinString = joinString.slice(0, 1).toLowerCase() + joinString.slice(1);
  }

  return joinString;
}

function sliceUpper(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

console.log(camelize('background-color-red'));
