/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = document.createElement('table');
  tableHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  constructor(rows) {
    this.render(rows);
  }

  render(rows) {
    this.elem.innerHTML = this.tableHTML;
    let tableBody = this.elem.querySelector('tbody');
    let template = document.createElement('template');

    for (let row of rows) {
      let tableRow = `
        <tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button onClick="this.closest('tr').remove()">X</button></td>
        </tr>
      `;

      template.innerHTML += tableRow;
    }

    tableBody.append(template.content);
  }
}


