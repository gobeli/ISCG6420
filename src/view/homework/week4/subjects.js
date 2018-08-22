import url from './subjects.xml';
import EditSubject from './editSubject';

let subjects = [];

function Subject (id, name) {
  this.id = id;
  this.name = name;
  this.guid = Math.random().toString(36).substr(2, 9);
}

function getNodeValue(node, tagName) {
 return node.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

function parseSubjects(doc) {
  const p = Array.from(doc.getElementsByTagName('Subject'));
  subjects = p.map(t => new Subject(getNodeValue(t, 'Id'), getNodeValue(t, 'Name')));
}

fetch(url)
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(parseSubjects);

const $display = document.getElementById('display'),
  $subjects = document.getElementById('subjects'),
  $add = document.getElementById('add');

function render() {
  $subjects.querySelector('tbody').innerHTML = subjects.map(s => `
    <tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td><button class="pure-button pure-button-primary button-small" onclick="edit('${s.guid}')">Edit</button></td>
    </tr>
  `).join('');
}

function edit(guid) {
  const subject = subjects.find(s => s.guid === guid);
  EditSubject.setSubject(subject, render);
}

function add() {
  const subject = new Subject('', '');
  subjects.push(subject);
  edit(subject.guid);
}

window.edit = edit;
$display.addEventListener('click', render);
$add.addEventListener('click', add);
EditSubject.init();