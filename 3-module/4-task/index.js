function showSalary(users, age) {
  let tempArray = [];

  users.filter(c => c.age <= age).forEach((current) => {
    tempArray.push(current.name + ', ' + current.balance);
  });

  return tempArray.join('\n');
}
