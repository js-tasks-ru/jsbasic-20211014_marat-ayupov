function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();

  console.log(friends);

  for (let friend of friends) {
    let li = document.createElement('li');
    li.append([friend.firstName, friend.lastName].join(' '));

    fragment.appendChild(li);
  }

  console.log(fragment);

  return ul.appendChild(fragment);
}
