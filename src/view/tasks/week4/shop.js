import productUrl from './product_list.xml';
import * as images from './images/*.jpg'

let products = [];

function Product (name, price, image) {
  this.name = name;
  this.price = price;
  this.image = image;
}

function getNodeValue(node, tagName) {
 return node.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

function parseProducts(doc) {
  const p = doc.getElementsByTagName('Product');
  for (let i = 0; i < p.length; i++) {
    const n = p[i];
    const name = getNodeValue(n, 'ProductName');
    const price = +getNodeValue(n, 'Price');
    const image = getNodeValue(n, 'Image');
    products.push(new Product(name, price, images[image.split('.')[0]]));
  }
}

fetch(productUrl)
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(parseProducts);

// products.push(new Product('milk', 5, require('./images/milk.jpg')));
// products.push(new Product('cornflakes', 10, require('./images/cornflake.jpg')));

function showProducts() {
  const $table = document.getElementById('dispProduct');
  const html = products.map((p, i) =>
    `<tr>
      <td>${p.name}</td>
      <td>$${p.price}</td>
      <td><img src="${p.image}" /></td>
      <td><button value="${i}" class="add" data-op="1">+</button></td>
      <td><input type="checkbox" id="chk-${i}" value=${p.price}></td>
      <td><button value="${i}" class="add" data-op="-1">-</button></td>
      <td><input type="number" min="0" style="width: 35px" class="quanitity" id="qnt-${i}"></td>
    </tr>`);
  $table.innerHTML = html.join('');
  Array.from(document.getElementsByClassName('add'))
    .forEach($el => $el.addEventListener('click', onAddChange));
  products.forEach((p,i) =>
    document.getElementById(`chk-${i}`).addEventListener('click', onChkChange));
}

function calculateCost() {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    let $chk = document.getElementById(`chk-${i}`);
    let $qnt = document.getElementById(`qnt-${i}`);
    total += $chk.checked ? products[i].price*(+$qnt.value) : 0;
  }
  document.getElementById('calcost').innerHTML = `total to pay = $${total}`;
}

function onChkChange(e) {
  const id = e.target.id.match(/\d+$/)[0];
  const $qnt = document.getElementById(`qnt-${id}`);
  $qnt.value = +e.target.checked;
}

function onAddChange(e) {
  const $qnt = document.getElementById(`qnt-${e.target.value}`);
  let val = +$qnt.value + (+e.target.dataset.op);
  val = val < 0 ? 0 : val;
  $qnt.value = val;
}

global.showProducts = showProducts;
global.calculateCost = calculateCost;