function getMinMax(str) {
  let numbers = str.split(' ').filter(c => Number.isFinite(+c));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
