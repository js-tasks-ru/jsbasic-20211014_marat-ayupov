function sumSalary(salaries) {
  let result = 0;

  for (let prop in salaries) {
    if (Number.isFinite(salaries[prop])) {
      result += salaries[prop];
    }
  }

  return result;
}

sumSalary({
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: true,
  test: null,
  test2: undefined,
});
