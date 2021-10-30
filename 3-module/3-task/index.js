function camelize(str) {
  let strings = str.split('-');
  let arrayStrings = [];

  strings.forEach((current, index, array) => {
    if ((strings[0] !== '') && index === 0) {
      arrayStrings.push(array[0]);
    } else {
      arrayStrings.push(current.slice(0, 1).toUpperCase() + current.slice(1));
    }
  });

  return arrayStrings.join('');
}
