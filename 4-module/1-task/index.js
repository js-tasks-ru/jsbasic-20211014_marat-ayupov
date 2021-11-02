function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();

  for (let friend of friends) {
    let li = document.createElement('li');
    li.textContent = ([friend.firstName, friend.lastName].join(' '));

    fragment.appendChild(li);
  }

  ul.appendChild(fragment);

  return ul;
}
