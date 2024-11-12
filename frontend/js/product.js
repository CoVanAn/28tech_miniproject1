
const getProduct = async (categorySlug, searchInput, page, limit = 9, sort = 'default') => {
    let url = `http://localhost:3000/products?_page=${page}&_limit=${limit}` ;
    if(categorySlug) url += `&q=${categorySlug}` ;
    else if(searchInput) url += `&title_like=${searchInput}`;
    if(sort === 'price-asc') url += `&_sort=price&_price=asc`;
    else if(sort === 'price-desc') url += `&_sort=price&_price=desc`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

let productCount = 0;

export const renderProduct = async (category = '', searchQuery = '', page = 1, limit, sort) => {
    const products = await getProduct(category, searchQuery, page, limit, sort);
    const productContainer = document.querySelector('#product-container');
    productContainer.innerHTML = '';
    productCount = 0;
    products.forEach(product => {
        productCount++;
        const productElement = document.createElement('div');
        productElement.classList.add('product__item');
        productElement.innerHTML = `
            <h4>${product.title}</h4>
            <img src="${product.images}" alt="${product.title}">
            <p>${product.price}</p>
        `;
        productContainer.appendChild(productElement);
    });
    
    renderPaginationControls(page);
};

const renderPaginationControls = (currentPage) => {
    const paginationContainer = document.querySelector('#pagination-container');
    paginationContainer.innerHTML = '';
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    if(currentPage === 1) {
        prevButton.disabled = true;
        prevButton.classList.add('disabled');
    }
    prevButton.textContent = 'Previous';
    nextButton.textContent = 'Next';
    prevButton.addEventListener('click', () => {
        renderProduct('', '', currentPage - 1);
    })
    if(productCount < 9) {
        nextButton.disabled = true; 
        nextButton.classList.add('disabled');
    }
    nextButton.addEventListener('click', () => {
        renderProduct('', '', currentPage + 1);
    })
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
};

const sortSelect = document.querySelector('#sort-order');

sortSelect.addEventListener('change', () => {
    renderProduct('', '', 1, 9, sortSelect.value);
});