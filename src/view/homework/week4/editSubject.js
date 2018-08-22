const $subjectName = document.getElementById('subjectName'),
  $id = document.getElementById('id'),
  $name = document.getElementById('name'),
  $edit = document.getElementById('edit');

let selectedSubject, callback;

function init() {
  $edit.style.display = 'none';
}

function setSubject(subject, cb) {
  selectedSubject = subject;
  $id.value = subject.id;
  $name.value = subject.name;
  $subjectName.innerHTML = subject.name;
  $edit.style.display = 'block';
  callback = cb;
}

function update(e) {
  e.preventDefault();
  selectedSubject.id = $id.value;
  selectedSubject.name = $name.value;
  init();
  callback(selectedSubject);
}

$edit.querySelector('form').addEventListener('submit', update);

export default { setSubject, init };