function makeDiagonalRed(table) {
  const trElements = table.querySelectorAll('tr');
  let j = 1;

  for (let trElement of trElements) {
    trElement.querySelector(`td:nth-child(${j})`).style.backgroundColor = 'red';
    j++;
  }
}
