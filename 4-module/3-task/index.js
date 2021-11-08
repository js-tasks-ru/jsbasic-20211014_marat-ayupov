function highlight(table) {
  const tdElements = table.querySelectorAll('td');
  let statusCell;
  let genderCell;
  let ageCell;

  for (let tdElement of tdElements) {
    if (tdElement.closest('thead')) {
      if (tdElement.textContent === 'Status') {
        statusCell = tdElement.cellIndex;
      }

      if (tdElement.textContent === 'Gender') {
        genderCell = tdElement.cellIndex;
      }

      if (tdElement.textContent === 'Age') {
        ageCell = tdElement.cellIndex;
      }
    }

    if (tdElement.closest('tbody')) {
      if (tdElement.cellIndex === statusCell) {
        if (!tdElement.dataset.available) {
          tdElement.parentElement.setAttribute('hidden', 'true');
        } else {
          tdElement.parentElement.classList.add(
            (tdElement.dataset.available === 'true') ? 'available' : 'unavailable'
          );
        }
      }

      if (tdElement.cellIndex === genderCell) {
        tdElement.parentElement.classList.add(
          (tdElement.textContent === 'm') ? 'male' : 'female'
        );
      }

      if (tdElement.cellIndex === ageCell && +tdElement.textContent < 18) {
        tdElement.parentElement.style.textDecoration = 'line-through';
      }
    }
  }
}
