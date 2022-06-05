const url =
'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

var results = document.getElementById('results')
const val = document.getElementById('box');
var searchip = document.getElementById('search');

const validateSearch = (e) => {
  e.preventDefault();
  const searchValue = val.value;
  // console.log(searchValue)
  if(searchValue == ''){
    results.innerHTML = '<div id="error">Please enter a query to search</div>'
  }else{
    fetchpage(searchValue);
  }
}
const fetchpage = async (searchValue) => {
  // e.preventDefault();
  results.innerHTML = '<div class="loading"></div>';
  try {
    console.log(searchValue)
    // results.innerHTML='<div>${searchValue}</div>'
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if(results.length < 1){      
      // console.log(results.length)
      error.innerHTML = '<div>No matching results. Please try again</div>'
    }else{
      error.innerHTML ='<div> </div>'
      renderResults(results);
    }
  } catch (error) {
    // console.log(error)
    results.innerHTML='<div>Error</div>'
  }
}
const renderResults = (list) =>{
  // console.log(list)
  const List = list.map((item) => {
    const {title, snippet, pageid} = item;
    return `<div class = 'cards'><a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
    <h4>${title}</h4>
    <p>${snippet}</p>
    </a></div>`
  }).join('');
  results.innerHTML = `<div class="articles">
          ${List}
        </div>`;
};

searchip.addEventListener('click', validateSearch) 