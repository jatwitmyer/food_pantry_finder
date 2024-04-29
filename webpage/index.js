function scrape() {
    //fetch from server
    console.log("add fetch here")  
  }

window.onload = function() {
  // const p = document.createElement('p');
  // p.textContent = 'This line was added using JavaScript.';
  // document.body.appendChild(p);

  const button = document.getElementById('scrape')
  button.addEventListener('click', scrape())
};