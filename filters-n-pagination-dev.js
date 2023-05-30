function fetchAndModifyProducts() {
    const pathWithoutQuery = window.location.pathname.split('?')[0];
//     if (pathWithoutQuery.endsWith('/rolex/watches') || pathWithoutQuery.endsWith('/rolex/watches/rolex-mens-watches') || pathWithoutQuery.endsWith('/rolex/watches/rolex-womens-watches')) {
    if (true) { // Keep the URL check as always true
        console.log('Fetching and modifying products...');
        $('.w-pagination-next').hide();

        return $.ajax({
            url: '/rs-en/rolex/watches?f4984b32_page=2',
            type: 'GET'
        }).then(secondPageResponse => {
            // console.log('Second page response received:', secondPageResponse);
            var parsedProducts = $(secondPageResponse).find('.rolex-grid-item');
            // console.log('Parsed products:', parsedProducts);

            var appendPromise = new Promise((resolve, reject) => {
                var checkAppendInterval = setInterval(() => {
                    // console.log('Parsed products length: ' + parsedProducts.children().length)
                    if (parsedProducts.children().length >= 100) {
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

function updatePageUrl(val) {
  const url = new URL(window.location.href);
  const pageParam = url.searchParams.get('page');

  if (pageParam) {
    url.searchParams.set('page', val);
  } else {
    url.searchParams.append('page', val);
  }

  window.history.replaceState({}, '', url);
}

function handleFilterURL(filterName, addFlag) {
  const url = new URL(window.location.href);
  const filters = url.searchParams.get('filters');
    
  console.log('UPDATING FILTER URL');
  console.log(filterName);
  console.log(addFlag);
    
  

  if (addFlag) {
    if (filters) {
      console.log('Filters present');
      url.searchParams.set('filters', `${filters},${filterName}`);
    } else {
      console.log('Filters not present');
      url.searchParams.set('filters', filterName);
    }
  } else {
    if (filters) {
      const updatedFilters = filters.split(',').filter(name => name !== filterName);
      url.searchParams.set('filters', updatedFilters.join(','));
    }
  }
  window.history.replaceState({}, '', url);
}

function parseFilterQuery() {
  const url = new URL(window.location.href);
  const filters = url.searchParams.get('filters');

  if (filters) {
    return filters.split(',');
  }

  return [];
}

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
            if(typeof document.getElementsByClassName('rolex-grid-wrap')[0]){
                var sectionOffset = $('.rolex-grid-wrap').offset().top;
                var scrollToPosition = sectionOffset - 200;
                $(window).scrollTop(scrollToPosition);
            } else {
                window.scrollTo({
                top: 100,
                behavior: 'smooth'
                });
            }
            
        });
        paginationData.currentPage--;
        updatePageUrl(paginationData.currentPage);
        updatePageNumbers(paginationData.itemsPerPage);
        displayItems(paginationData.itemsPerPage);
        
        document.getElementsByClassName('next-page')[0].style.display = 'block';
        
        if (parseInt(paginationData.currentPage) === 1) {
            document.getElementsByClassName('prev-page')[0].style.display = 'none';
        } 
        
        
    }
}

function handleNextButtonClick() {
    if (paginationData.currentPage < paginationData.totalPages) {
        setTimeout(() => {
            if(typeof document.getElementsByClassName('rolex-grid-wrap')[0]){
                var sectionOffset = $('.rolex-grid-wrap').offset().top;
                var scrollToPosition = sectionOffset - 200;
                $(window).scrollTop(scrollToPosition);
            } else {
                window.scrollTo({
                top: 100,
                behavior: 'smooth'
                });
            }
        });
        paginationData.currentPage++;
        updatePageUrl(paginationData.currentPage);
        updatePageNumbers(paginationData.itemsPerPage);
        displayItems(paginationData.itemsPerPage);
        
        document.getElementsByClassName('prev-page')[0].style.display = 'block';
        
        if (paginationData.currentPage === paginationData.totalPages) {
            document.getElementsByClassName('next-page')[0].style.display = 'none';
        } 
    }
}

function createPaginationForProducts(itemsPerPage, reset) {
    document.getElementsByClassName('rolex-pagination-box')[0].style.display = 'none';
    
    document.getElementsByClassName('prev-page')[0].style.cursor = 'pointer';

    const productsContainer = document.getElementById('products-container');
    const productItems = Array.from(productsContainer.getElementsByClassName('rolex-grid-item')).filter(item => item.style.display !== 'none');

    paginationData.itemsPerPage = itemsPerPage;
    paginationData.totalItems = productItems.length;
    paginationData.productItems = productItems;

    // console.log('Total items: ' + paginationData.totalItems);
    
    // Get the URL of the current page
    const url = new URL(window.location.href);

    // Get the value of the f4984b32_page query parameter
    const pageParam = url.searchParams.get('page');

    // Check if the parameter exists and its value is a number
    if (pageParam && !isNaN(pageParam) && !reset) {
      // Perform your desired action here
      console.log('The value of age is a number:', pageParam);
      paginationData.currentPage = pageParam;
      
    } else {
      // Handle the case when the parameter doesn't exist or its value is not a number
      console.log('The page parameter is missing or its value is not a number.');
      paginationData.currentPage = 1;
      updatePageUrl(1);
    }

    
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
    
    if (parseInt(paginationData.currentPage) === 1) {
        document.getElementsByClassName('prev-page')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('prev-page')[0].style.display = 'block';
    }
    
    console.log('product items length: ' + paginationData.productItems.length);
    console.log('itemws per page: ' + paginationData.itemsPerPage);
    console.log('current page: ' + paginationData.currentPage);
    
    if ((paginationData.productItems.length  / paginationData.itemsPerPage) + 1 === parseInt(paginationData.currentPage)) {
        document.getElementsByClassName('next-page')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('next-page')[0].style.display = 'block';
    }
   
//     if (paginationData.currentPage + 1 === paginationData.totalPages) {
//         document.getElementsByClassName('next-page')[0].style.display = 'none';
//     } 

    
    
}

function initFilters() {
  return new Promise((resolve) => {
    document.getElementById('empty-state').style.display = 'none';
    
    // Get the filter checkboxes and watch elements
    const filterParentElements = document.querySelectorAll('.rolex-form-checkbox');
    console.log('checkboxes: ');
    console.log(filterParentElements);
    watchElements = document.querySelectorAll('.rolex-grid-item');

    // Keep track of the number of event listeners applied
    let listenersApplied = 0;

    // Add event listener to each filter checkbox
    filterParentElements.forEach((parentElement) => {
      console.log('Adding change listener...');
      const checkbox = parentElement.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        // Add the class to the div representing the custom checkbox
        const checkboxDiv = parentElement.querySelector('.w-checkbox-input');
        setTimeout(() => {
           const label = parentElement.querySelector('.rolex-form-text');
           const filterValue = label.textContent;
          if (checkbox.checked) {
            checkboxDiv.classList.add('w--redirected-checked');
            handleFilterURL(filterValue, true);
          } else {
            checkboxDiv.classList.remove('w--redirected-checked');
            handleFilterURL(filterValue, false);
          }
        });

        // Handle the change event
        applyFilters(true);
      });

      // Increase the count of applied listeners
      listenersApplied++;

      // Check if all event listeners have been applied
      if (listenersApplied === filterParentElements.length) {
        console.log('All event listeners applied.');

        // Add event listener to reset link
        waitForElm('.w-checkbox-input').then((elm) => {
          const resetLink = document.querySelector('.rolex-reset');
          resetLink.addEventListener('click', () => {
            // Reset all checkboxes to false
            filterParentElements.forEach((parentElement) => {
              const checkbox = parentElement.querySelector('input[type="checkbox"]');
              const checkboxDiv = parentElement.querySelector('.w-checkbox-input');
              checkbox.checked = false;
              checkboxDiv.classList.remove('w--redirected-checked');
              applyFilters();
            });

            // Trigger filter change event to apply changes
            const filterChangeEvent = new Event('change');
            filterParentElements[0].dispatchEvent(filterChangeEvent);
          });
            
          const filterNames = parseFilterQuery();
            
          const pathWithoutQuery = window.location.pathname.split('?')[0];
            
          if (pathWithoutQuery.endsWith('/rolex-womens-watches')) {
              filterNames.push('Women');
          }
            
          if (pathWithoutQuery.endsWith('/rolex-mens-watches')) {
              filterNames.push('Men');
          }
            
          filterParentElements.forEach((parentElement) => {
              const label = parentElement.querySelector('.rolex-form-text');
              const filterValue = label.textContent;
              
              if (filterNames.includes(filterValue)) {
                  console.log('setting filter: ' + filterValue);
                  const checkbox = parentElement.querySelector('input[type="checkbox"]');
                  const checkboxDiv = parentElement.querySelector('.w-checkbox-input');
                  checkbox.checked = true;
                  checkboxDiv.classList.add('w--redirected-checked');
                  
              }
              
              
            });
            
            applyFilters();

          resolve(); // Resolve the promise
        });
      }
    });
  });

  function applyFilters(reset) {
    console.log('applying filters...');
    console.log('checkboxes: ');
    const filterParentElements = document.querySelectorAll('.rolex-form-checkbox');
    console.log(filterParentElements);

    // Get the selected filter values
    const selectedFilters = Array.from(filterParentElements).reduce((filters, parentElement) => {
      const checkbox = parentElement.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        const filterGroup = checkbox.getAttribute('filter-group');
        const label = parentElement.querySelector('.rolex-form-text');
        const filterValue = label.textContent;
        filters[filterGroup] = filterValue;
      }
      return filters;
    }, {});

    console.log('selected filters: ');
    console.log(selectedFilters);
      
    let isListEmpty = true;

    watchElements = document.querySelectorAll('.rolex-grid-item');
      
    watchElements.forEach((watchElement) => {
      // Get the filter values from the watch element
      let filterValues = Array.from(watchElement.querySelectorAll('[fs-cmsfilter-field]')).map((filter) => filter.innerHTML);
        const parsedFilterValues = [];
        filterValues = filterValues.map(value => {
          if (value.includes(';')) {
            parsedFilterValues.push(...value.split(';'));
          } else {
            parsedFilterValues.push(value);
          }
        });
        
      console.log('Filter Values: ');
      console.log(filterValues);
        
      console.log('Parsed Filter Values: ');
      console.log(parsedFilterValues);
        
      // Check if the watch should be displayed or hidden based on the selected filters
      const shouldDisplay = Object.entries(selectedFilters).every(([filterGroup, filterValue]) => {
        const filtersInGroup = Array.from(filterParentElements).filter(
          (parentElement) => parentElement.querySelector('input[type="checkbox"]').getAttribute('filter-group') === filterGroup
        );
          
//         console.log('Filters in Group: ');
//         console.log(filtersInGroup);

        // If no filters are selected in the group, consider it a match
        if (!filtersInGroup.length) {
          return true;
        }

        return filtersInGroup.some((parentElement) => {
          const checkbox = parentElement.querySelector('input[type="checkbox"]');
          const isChecked = checkbox.checked;
//           console.log('Checkbox input: ');
//           console.log(checkbox);
          const label = parentElement.querySelector('.rolex-form-text');
          const filterName = label.textContent;
//           console.log('Processing filter with name: ' + filterName);
//           console.log('Is Checked: ' + isChecked);
            
          return isChecked && parsedFilterValues.some(value => value.toLowerCase() === filterName.toLowerCase());
        });

      });
        
//       console.log('Should display: ');
//       console.log(shouldDisplay);

      // Apply display style to the watch element
      if (shouldDisplay) {
          isListEmpty = false;
      }
      watchElement.style.display = shouldDisplay ? 'block' : 'none';
    });
      
    if (isListEmpty) {
      console.log('empty results...');
      document.getElementsByClassName('rolex-pagination__container')[0].style.display = 'none';
      document.getElementById('empty-state').style.display = 'block';
    } else {
      document.getElementsByClassName('rolex-pagination__container')[0].style.display = 'flex';
      document.getElementById('empty-state').style.display = 'none';
    }

    // Call your pagination function here
    createPaginationForProducts(18, reset);
    }
}


