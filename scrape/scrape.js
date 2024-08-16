const{chromium} = require('playwright');
const fs = require('fs');
const { exit } = require('process');
const prompt = require("prompt-sync")();



// scrape data about food pantries near the user's location
async function scrape(address) {
  const googleUrl = `https://www.google.com/maps/search/food+pantries+near+"${address}"`;
  // fs.writeFile('scrape/pantries.csv', '', err => {
  //   if (err) {
  //     // console.error('Error while clearing pantries.csv:', err);
  //   } else {
  //     // console.log('File cleared successfully');
  //   }
  // });
  // const nameSheet ='scrape/pantries.csv';

  // console.time("Execution Time");
  console.log("\nFinding the top food pantries near you.");

  const browser = await chromium.launch({headless:true});
  const context = await browser.newContext();
  context.setDefaultTimeout(10000); // Set default timeout to 10 seconds
  const page = await browser.newPage();
  await page.goto(googleUrl);
  await page.waitForSelector('[jstcache="3"]');

  const scrollable = await page.$('xpath=/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]');
  if (!scrollable) {
    console.log('Scrollable element not found.');
    await browser.close();
    return;
  }

  let endOfList=false;
  while (!endOfList) {
    await scrollable.evaluate(node => node.scrollBy(0,50000));
    endOfList = await page.evaluate(()=>document.body.innerText.includes("You've reached the end of the list"));
  }

  //FIND ALL PANTRIES (URLS) FROM THE SEARCH
  const urlsLocator = page.locator('a');
  const urls = await urlsLocator.evaluateAll(links => links.map(link => link.href).filter(href => href.startsWith('https://www.google.com/maps/place/')));
  const numPantries = urls.length
  console.log(numPantries)
  

  const scrapePageData = async(url) => { //this is the actual scraper function
    const newPage = await browser.newPage();
    await newPage.goto(url);
    await newPage.waitForSelector('[jstcache="3"]');

    let name = '';
    try {
      const nameElement = await newPage.locator('[class="DUwDvf lfPIob"]')
      name = nameElement ? await nameElement.evaluate(element => element.textContent) : '';
      name = `"${name}"`;
      // console.log(name);
    }
    catch {
      // console.log(`Error finding name: ${url}`);
    }
    
    let address = '';
    try {
    const addressElement = await newPage.locator('[data-item-id="address"]')
    address = addressElement ? await addressElement.evaluate(element => element.textContent.slice(1)) : '';
    address = `"${address}"`;
    // console.log(`Address: ${address}`);
    }
    catch {
      // console.log(`Error finding address: ${url}`);
    }

    let hours = '';
    try {
      const hoursElement = await newPage.locator('div.t39EBf.GUrTXd')
      hours = hoursElement ? await hoursElement.evaluate(element => element.ariaLabel) : '';
      hours = `"${hours}"`;
      // console.log(hours);
    }
    catch {
      // console.log(`Error finding hours: ${url}`);
    }

    let phone = '';
    try {
    const phoneElement = await newPage.locator('[data-tooltip="Copy phone number"]').first()
    phone = phoneElement ? await phoneElement.evaluate(element => element.textContent.slice(1)) : '';
    phone = `"${phone}"`;
    // console.log(`Phone: ${phone}`);
    }
    catch {
      // console.log(`Error finding phone: ${url}`);
    }

    let website = '';
    try {
    const websiteElement = await newPage.locator('[data-tooltip="Open website"]').first()
    website = websiteElement ? await websiteElement.evaluate(element => element.href) : '';
    website = `"${website}"`;
    // console.log(`Website: ${website}`);
    }
    catch {
      // console.log(`Error finding website: ${url}`);
    }

    let rating = '';
    try {
    const ratingElement = await newPage.locator('span.ceNzKf[aria-label]').first()
    rating = ratingElement ? await ratingElement.evaluate(element => element.ariaLabel.slice(0,9)) : '';
    rating = `"${rating}"`;
    // console.log(`Rating: ${rating}`);
    }
    catch {
      // console.log(`Error finding rating: ${url}`);
    }
    
    url=`"${url}"`;

    await newPage.close();
    return{name,address,hours,phone,website,rating,url};
  };

  // const batchSize=5;
  // const results=[];
  // for(let i=0; i<urls.length; i+=batchSize) {
  //   const batchUrls = urls.slice(i,i+batchSize);
  //   const batchResults = await Promise.all(batchUrls.map(url => scrapePageData(url)));
  //   results.push(...batchResults);
  //   // console.log(`Batch ${i/batchSize+1} completed.`);
  //   console.log(`${(i/batchSize+1)*50}% complete`); //hardcoded for two batches
  // }

  // const csvHeader='Name,Address,Hours,Phone,Website,Rating,Url\n';
  // const csvRows=results.map(r=>`${r.name},${r.address},${r.hours},${r.phone},${r.website},${r.rating},${r.url}`).join('\n');
  // fs.writeFileSync(nameSheet,csvHeader+csvRows);
  
  await browser.close();
  return numPantries;
  // console.timeEnd("Execution Time");
  // console.log("Located the top 8 pantries near you.");
}

// const userAddress = "33523"
// scrape(userAddress);

module.exports = scrape;