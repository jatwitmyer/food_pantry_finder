const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function address_to_coordinates() {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://www.latlong.net/convert-address-to-lat-long.html');
  
    await driver.manage().setTimeouts({implicit: 500});
  
    let input = await driver.findElement(By.className('width70'));
    // console.log(input)
    const tagName = input.getTagName
    console.log(tagName)
    // let submitButton = await driver.findElement(By.css('button'));
  
    // await textBox.sendKeys('Selenium');
    // await submitButton.click();
  
    // let message = await driver.findElement(By.id('message'));
    // let value = await message.getText();
    // assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    await driver.quit();
  }
}())