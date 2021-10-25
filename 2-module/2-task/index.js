function isEmpty(obj) {
  for (let item in obj) {
    if (item in obj) {
      return false;
    }
  }

  return true;
}

let schedule = {};

console.log(isEmpty(schedule)); // true

schedule["8:30"] = "подъём";

console.log(isEmpty(schedule)); // false
