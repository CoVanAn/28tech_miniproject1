import { renderProduct } from './product.js';

const getCategory = async () => {
    const response = await fetch('http://localhost:3000/categories');
    const data = await response.json();
    return data;
}

export const renderCategory = async () => {
    const categories = await getCategory();
    const categoriesContainer = document.querySelector('#category-container');
    const allCategoryElement = document.querySelector('#all');
    allCategoryElement.addEventListener('click', () => {
        renderProduct();
    })
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category__item');   
        categoryElement.innerHTML = `<h5>${category.name}</h5>`;
        categoryElement.addEventListener('click', () => {
            console.log(category.slug);
            renderProduct(category.slug);
        })
        categoriesContainer.appendChild(categoryElement);
    });
}
