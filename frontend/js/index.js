import { renderCategory } from './category.js';
import { renderProduct } from './product.js';

renderCategory();
renderProduct('', '', 1);

document.querySelector('#search_btn').addEventListener('click', () => {
    const searchInput = document.querySelector('#search_input').value;
    renderProduct('', searchInput);
})