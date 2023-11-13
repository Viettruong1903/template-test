document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.querySelector('.js-image-container');
  const container = document.querySelector('#container');
  const loader = document.querySelector('#loader');
  // Unsplash API
  let count = 10;
  let currentPage = 1;
  const apiKey = 'aTEK5hdWYvO0RZyZozHCUaOI76nlG_n3Izv7-rKMbI0';
  const URL_API = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

  async function getAPI() {
    loadingPage();
    try {
      const response = await fetch(URL_API);
      const data = await response.json();
      showImages(data);
    } catch (error) {
      console.error(response.status);
    } finally {
      completeLoadingPage();
    }
  }

  function showImages(arr) {
    arr.forEach(element => {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('img-container');
      imageDiv.innerHTML = `
        <img src=${element.urls.regular} alt="${element.alt_description}">
      `
    imageContainer.appendChild(imageDiv);
    });
  }


  window.addEventListener('scroll', () => {

    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 10) {
      currentPage++;
      getAPI();
    }

  },{
    passive:true
  });

  function loadingPage() {
    loader.hidden = false;
    container.hidden = true;
  }

  function completeLoadingPage() {
    loader.hidden = true;
    container.hidden = false;
  }

  getAPI();
})
