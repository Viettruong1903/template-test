const quoteContainer = document.querySelector('#quote-container');
const loader = document.querySelector('.loader-js');
const H1 = document.querySelector('h1');
let currentPage = 1;
const limit = 10;
let total = 0;

async function getQuotesAPI(page,limit) {
  
  const apiURL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}
  `
  const response = await fetch(apiURL);
  if(!response.ok) {
    throw new Error(`An Error occured: ${response.status}`);
  }
  return await response.json();
}


//showQuotes

function showQuotes(arr) {
  arr.forEach(element => {
    const quoteBlock = document.createElement('blockquote');
    quoteBlock.classList.add('blockquote');
    quoteBlock.innerHTML = `
      <p class="quote">${element.quote}</p>
      <span>${element.author}</spam>
    `;
    quoteContainer.appendChild(quoteBlock);
  });
};

function loadingSpinner() { 
  loader.hidden = false;
  quoteContainer.hidden = true;
  H1.hidden = true;
}
function completingSpinner() { 
  loader.hidden = true;
  quoteContainer.hidden = false;
  H1.hidden = false;
}

function hasMoreQuotes(page,limit,total) {
  const startIndex = (page - 1) * limit + 1;
  return total === 0 || startIndex < total;
}

async function loadQuotes(page,limit) {
  if(page === 1) {
    loadingSpinner();
  }
  try {
    if (hasMoreQuotes(page,limit,total)) {
      //getQuotesAPI
      const response = await getQuotesAPI(page,limit);
      //showQuotes
      showQuotes(response.data);
      // update the total
      total = response.total;
    }
  } catch (error) {
    console.error('Oops, an error occurred:', error);
  } finally {
    completingSpinner();
  }
}


document.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 5 && hasMoreQuotes(currentPage,limit,total)) {
    currentPage++   
    loadQuotes(currentPage,limit);
  }
}, {passive: true});

// initialize
loadQuotes(currentPage,limit);










