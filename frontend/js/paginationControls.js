export const renderPaginationControls = (currentPage) => {
    const paginationContainer = document.querySelector('#pagination-container');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        renderProduct('', '', currentPage - 1);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        renderProduct('', '', currentPage + 1);
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
};
