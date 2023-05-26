function fetchAndModifyProducts() {
    // if (window.location.pathname === '/rolex/watches') {
    if (true) { // Keep the URL check as always true
        // console.log('Fetching and modifying products...');
        $('.w-pagination-next').hide();

        return $.ajax({
            url: '?f4984b32_page=2',
            type: 'GET'
        }).then(secondPageResponse => {
            // console.log('Second page response received:', secondPageResponse);
            var parsedProducts = $(secondPageResponse).find('.rolex-grid-item');
            // console.log('Parsed products:', parsedProducts);

            var appendPromise = new Promise((resolve, reject) => {
                var checkAppendInterval = setInterval(() => {
                    // console.log('Parsed products length: ' + parsedProducts.children().length)
                    if (parsedProducts.children().length >= 54) {
                        clearInterval(checkAppendInterval);
                        $('#products-container').append(parsedProducts);
                        // console.log('Products appended successfully.');
                        createPaginationForProducts(18);
                        resolve();
                    }
                }, 100);
            });

            return appendPromise;
        });
    } else {
        // console.log('URL does not match. Skipping AJAX call.');
        return Promise.resolve(); // Skip the AJAX call if the URL doesn't match
    }
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const paginationData = {
    currentPage: 1,
    totalPages: 0
};

function displayItems(itemsPerPage) {

    // console.log('Total items in display items: ' + paginationData.productItems.length);
    for (let i = 0; i < paginationData.productItems.length; i++) {
        // console.log('Product item: ' + i);
        // console.log('Current page: ' + paginationData.currentPage);
        // console.log(paginationData.productItems[i].style.display);
        // console.log(paginationData);
        // console.log(paginationData.currentPage);
        // console.log(itemsPerPage);
        if (i >= (paginationData.currentPage - 1) * itemsPerPage && i < paginationData.currentPage * itemsPerPage) {
            // console.log('true');
            paginationData.productItems[i].style.display = 'block';
        } else {
            paginationData.productItems[i].style.display = 'none';
            // console.log()
            // console.log('false');
        }
    }
}

function updatePageNumbers(itemsPerPage) {
    const pageContainer = document.getElementById('page-container');
    pageContainer.textContent = 'Page ' + paginationData.currentPage;
    paginationData.totalPages = Math.ceil(paginationData.totalItems / itemsPerPage);
}

function handlePrevButtonClick() {
    if (paginationData.currentPage > 1) {
        setTimeout(() => {
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            });
        });
        paginationData.currentPage--;
        updatePageNumbers(paginationData.itemsPerPage);
        displayItems(paginationData.itemsPerPage);
    }
}

function handleNextButtonClick() {
    if (paginationData.currentPage < paginationData.totalPages) {
        setTimeout(() => {
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            });
        });
        paginationData.currentPage++;
        updatePageNumbers(paginationData.itemsPerPage);
        displayItems(paginationData.itemsPerPage);
    }
}

function createPaginationForProducts(itemsPerPage) {
    document.getElementsByClassName('rolex-pagination-box')[0].style.display = 'none';

    const productsContainer = document.getElementById('products-container');
    const productItems = Array.from(productsContainer.getElementsByClassName('rolex-grid-item')).filter(item => item.style.display !== 'none');

    paginationData.itemsPerPage = itemsPerPage;
    paginationData.totalItems = productItems.length;
    paginationData.productItems = productItems;

    // console.log('Total items: ' + paginationData.totalItems);

    paginationData.currentPage = 1;
    updatePageNumbers(itemsPerPage);
    displayItems(itemsPerPage);

    let prevButton = document.querySelector('.prev-page');
    let nextButton = document.querySelector('.next-page');

    // Remove existing event listeners
    prevButton.removeEventListener('click', handlePrevButtonClick);
    nextButton.removeEventListener('click', handleNextButtonClick);

    // Add event listeners
    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
}

function initFilters() {
  return new Promise((resolve) => {
    // Get the filter checkboxes and watch elements
    const filterParentElements = document.querySelectorAll('.rolex-form-checkbox');
    let watchElements = document.querySelectorAll('.rolex-grid-item');

    // Group the filters by category
    const filterCategories = {};

    // Add event listener to each filter checkbox
    filterParentElements.forEach((parentElement) => {
      const checkbox = parentElement.querySelector('input[type="checkbox"]');
      const checkboxDiv = parentElement.querySelector('.w-checkbox-input');
      const label = parentElement.querySelector('.w-form-label');

      // Check if the element is a label
      if (label) {
        const categoryName = label.getAttribute('fs-cmsfilter-field');

        // Check if the category has changed
        if (!filterCategories[categoryName]) {
          filterCategories[categoryName] = [];
        }

        // Add the filter checkbox to the corresponding category
        filterCategories[categoryName].push(checkbox);
          
        console.log('filter categories');
        console.log(filterCategories);

        checkbox.addEventListener('change', () => {
          // Add the class to the div representing the custom checkbox
          setTimeout(() => {
            if (checkbox.checked) {
              checkboxDiv.classList.add('w--redirected-checked');
            } else {
              checkboxDiv.classList.remove('w--redirected-checked');
            }
          });

          // Handle the change event
          applyFilters(filterCategories, watchElements);
        });
      }
    });

    // Resolve the promise
    resolve();
  });
    
    function applyFilters(filterCategories, watchElements) {
      // Get the selected filter values for each category
      const selectedFilters = Object.values(filterCategories)
        .map((category) =>
          category
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.getAttribute('fs-cmsfilter-field'))
        )
        .flat();
        
      console.log('selected filters');
        console.log(selectedFilters);

      // Iterate over each watch element
      watchElements.forEach((watchElement) => {
        // Get the filter values from the watch element
        const filterValues = Array.from(watchElement.querySelectorAll('[fs-cmsfilter-field]'))
          .map((filter) => filter.getAttribute('fs-cmsfilter-field'));

        // Check if the watch should be displayed or hidden based on the selected filters
        const shouldDisplay = selectedFilters.some((filter) => filterValues.includes(filter));

        // Apply display style to the watch element
        watchElement.style.display = shouldDisplay ? 'block' : 'none';
      });

      // Call your pagination function here
      paginationData.currentPage = 1;
      createPaginationForProducts(18);
}
}


