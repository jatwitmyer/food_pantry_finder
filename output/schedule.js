const fs = require('fs');
const csv = require('csv-parser');
const jsdom = require('jsdom');
const { table } = require('console');
const { unescape } = require('querystring');
const { JSDOM } = jsdom;

const data = [];

fs.createReadStream('../pantries.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })

  .on('end', () => {
    // console.log(data) //an array of objects with keys Name, Address, Hours, Phone, Website, Rating, Url
    fs.readFile('schedule.html', 'utf8', function(err, html){
        if (err) throw err;

        const dom = new JSDOM(html);
        const document = dom.window.document;
        const tableData = document.querySelector('.table-data');

        data.forEach((row) => { //for each row from the csv
            //find the hours for that day and put it in the table if they're not closed
            const allHours = row.Hours
            if (row.Hours === "") {
              console.log("No hours found for this pantry")
            }
            else {

              const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
              days.forEach((day) => {
                const dayIndex = allHours.indexOf(day);
                if (dayIndex !== -1) {
                  const semicolonIndex = allHours.indexOf(';', dayIndex);
                  let listedHours = allHours.slice(dayIndex, semicolonIndex);
                  listedHours = listedHours.replace(". Hide open hours for the wee", '');
                  
                  if (!listedHours.includes('Closed')) {
                    const dayCell = tableData.querySelector(`.${day}`);
                    const div = document.createElement('div');
                    div.className = "pantry-card";
                    console.log("div made")
                    
                    const hoursSpan = document.createElement('span').textContent = `${listedHours.slice(day.length + 2)}: `;
                    hoursSpan.className = "hours";
                    div.append(hoursSpan);
                    
                    const nameSpan = document.createElement('span').textContent = row.Name;
                    nameSpan.className = "name";
                    div.append(nameSpan);
                    
                    const addressP = document.createElement('p').textContent = `Address: ${row.Address}`;
                    addressP.className = "address";
                    div.append(addressP);
                    
                    const phoneP = document.createElement('p').textContent = `Phone: ${row.Phone}`;
                    phoneP
                    div.append(phoneP);
                    
                    const websiteP = document.createElement('p').textContent = `Website: ${row.Website}`;
                    websiteP.className = "website";
                    div.append(websiteP);
                    
                    const ratingP = document.createElement('p').textContent = `Rating: ${row.Rating}`;
                    ratingP.className = "rating";
                    div.append(ratingP);
                    
                    dayCell.append(div);
                  }
                } 
              });
            }

        })

        fs.writeFile('schedule.html', dom.serialize(), function(err){
            if (err) throw err;
        });
    });
  });


function addPantry(day, hours, tableRow) {

}