// https://www.youtube.com/watch?v=c-M5oUJBgh4&ab_channel=MikePowers

const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  nameSheet = "pantries.csv";
  googleUrl =
    "https://www.google.com/maps/search/food+pantries/@28.1447894,-82.4283315,12z/data=!3m1!4b1?entry=ttu";
  console.time("Execution Time");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(googleUrl);
  await page.waitForSelector('[jstcache="3"]');

  // const scrollable = await page.$('xpath=/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]');
  // if (!scrollable) {
  //   console.log('Scrollable element not found.');
  //   await browser.close();
  //   return;
  // }

  // let endOfList=false;
  // while (!endOfList) {
  //   await scrollable.evaluate(node => node.scrollBy(0,50000));
  //   endOfList = await page.evaluate(()=>document.body.innerText.includes("You've reached the end of the list"));
  // }

  const urls = await page.$$eval("a", (links) =>
    links
      .map((link) => link.href)
      .filter((href) => href.startsWith("https://www.google.com/maps/place/"))
  );

  const scrapePageData = async (url) => {
    const newPage = await browser.newPage();
    await newPage.goto(url);
    await newPage.waitForSelector('[jstcache="3"]');

    const nameElement = await newPage.$(
      "xpath=/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[1]/h1"
    );
    let name = nameElement
      ? await newPage.evaluate((element) => element.textContent, nameElement)
      : "";
    name = `"${name}"`;

    const ratingElement = await newPage.$(
      "xpath=/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[1]/div[2]/span[1]/span[1]"
    );
    let rating = ratingElement
      ? await newPage.evaluate((element) => element.textContent, ratingElement)
      : "";
    rating = `"${rating}"`;

    const reviewsElement = await newPage.$(
      "xpath=/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[1]/div[2]/span[2]/span/span"
    );
    let reviews = reviewsElement
      ? await newPage.evaluate((element) => element.textContent, reviewsElement)
      : "";
    reviews = reviews.replace(/\(|\)/g, "");
    reviews = `"${reviews}"`;

    const categoryElement = await newPage.$(
      "xpath=/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[2]/span/span/button"
    );
    let category = categoryElement
      ? await newPage.evaluate(
          (element) => element.textContent,
          categoryElement
        )
      : "";
    category = `"${category}"`;

// SELECTING HOURS

    // // Wait for the element containing the hours to appear on the page
    // await newPage.waitForSelector('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div.OqCZI.fontBodyMedium.WVXvdc > div.OMl5r.hH0dDd > div.MkV9 > div.o0Svhf');

    // // Select the element
    // const hoursElement = await newPage.$('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div.OqCZI.fontBodyMedium.WVXvdc > div.OMl5r.hH0dDd > div.MkV9 > div.o0Svhf');

    // // Extract the text content of the element
    // let hours = hoursElement
    //   ? await newPage.evaluate((element) => element.textContent, hoursElement)
    //   : '';

    // Click on the button or perform the action that reveals the hours
    await newPage.click('#QA0Szd > div > div > div.w6VYqd > div.bJzME.tTVLSc > div > div.e07Vkf.kA9KIf > div > div > div:nth-child(7) > div.OqCZI.fontBodyMedium.WVXvdc > div.OMl5r.hH0dDd > div.MkV9 > div.o0Svhf');
    
    // Wait for the element containing the hours to appear on the page
    await newPage.waitForSelector('.t39EBf GUrTXd');

    // Select the element
    const hoursElement = await newPage.$('.t39EBf GUrTXd');

    // Extract the aria-label attribute of the element
    let hours = hoursElement
      ? await newPage.evaluate((element) => element.getAttribute('aria-label'), hoursElement)
      : '';
   
  // SELECTING ADDRESS

    const addressElement = await newPage.$(
      'button[data-tooltip="Copy address"]'
    );
    let address = addressElement
      ? await newPage.evaluate((element) => element.textContent, addressElement)
      : "";
    address = `"${address}"`;

    const websiteElement =
      (await newPage.$('a[data-tooltip="Open website"]')) ||
      (await newPage.$('a[data-tooltip="Open menu link"]'));
    let website = websiteElement
      ? await newPage.evaluate(
          (element) => element.getAttribute("href"),
          websiteElement
        )
      : "";
    website = `"${website}"`;

    const phoneElement = await newPage.$(
      'button[data-tooltip="Copy phone number"]'
    );
    let phone = phoneElement
      ? await newPage.evaluate((element) => element.textContent, phoneElement)
      : "";
    phone = `"${phone}"`;

    url = `"${url}"`;

    await newPage.close();
    return {
      name,
      rating,
      reviews,
      category,
      hours,
      address,
      website,
      phone,
      url,
    };
  };

  const batchSize = 5;
  const results = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batchUrls = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batchUrls.map((url) => scrapePageData(url))
    );
    results.push(...batchResults);
    console.log(`Batch ${i / batchSize + 1} completed.`);
  }

  const csvHeader =
    "Name,Rating,Reviews,Category,Hours,Address,Website,Phone,Url\n";
  const csvRows = results
    .map(
      (r) =>
        `${r.name},${r.rating},${r.reviews},${r.category},${r.hours},${r.address},${r.website},${r.phone},${r.url}`
    )
    .join("\n");
  fs.writeFileSync(nameSheet, csvHeader + csvRows);

  await browser.close();
  console.timeEnd("Execution Time");
})();
