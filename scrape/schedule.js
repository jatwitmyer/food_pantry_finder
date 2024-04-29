const fs = require('fs');
const csv = require('csv-parser');
const jsdom = require('jsdom');
const { table } = require('console');
const { unescape } = require('querystring');
const { JSDOM } = jsdom;

const data = [];

fs.createReadStream('./pantries.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })

  .on('end', () => {
    console.log('Current directory:', process.cwd())
    if (!process.cwd().includes('scrape')) {
      process.chdir('./scrape');
    }
    // console.log(data) //an array of objects with keys Name, Address, Hours, Phone, Website, Rating, Url
    fs.readFile('schedule.html', 'utf8', function(err, html){
        if (err) throw err;

        const dom = new JSDOM(html);
        const document = dom.window.document;
        const tableData = document.querySelector('.table-data');
        tableData.innerHTML = `
        <td class="Sunday"></td>
        <td class="Monday"></td>
        <td class="Tuesday"></td>
        <td class="Wednesday"></td>
        <td class="Thursday"></td>
        <td class="Friday"></td>
        <td class="Saturday"></td>`; //reset the table

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
                    
                    const hoursSpan = document.createElement('span')
                    hoursSpan.textContent = `${listedHours.slice(day.length + 2)}: `;
                    hoursSpan.className = "hours";
                    div.append(hoursSpan);
                    
                    const nameSpan = document.createElement('span')
                    nameSpan.textContent = row.Name;
                    nameSpan.className = "name";
                    div.append(nameSpan);

                    const cardHeader = document.createElement('h3');
                    cardHeader.className = "card-header";
                    cardHeader.append(hoursSpan);
                    cardHeader.append(nameSpan);
                    div.append(cardHeader);
                    
                    if (row.Address) {
                      const addressP = document.createElement('p')
                      addressP.className = "address";
                      const addressSub = document.createElement('span');
                      addressSub.textContent = "Address: ";
                      addressSub.className = "pantry-card-subheader";
                      addressP.append(addressSub);
                      const addressBody = document.createElement('span');
                      addressBody.textContent = `${row.Address}`;
                      addressBody.className = "address";
                      addressP.append(addressBody);
                      div.append(addressP);
                    }

                    if (row.Phone) {
                    const phoneP = document.createElement('p')
                    phoneP.className = "phone";
                    const phoneSub = document.createElement('span');
                    phoneSub.textContent = "Phone: ";
                    phoneSub.className = "pantry-card-subheader";
                    phoneP.append(phoneSub);
                    const phoneBody = document.createElement('span');
                    phoneBody.textContent = `${row.Phone}`;
                    phoneBody.className = "phone";
                    phoneP.append(phoneBody);
                    div.append(phoneP);
                    }

                    if (row.Website) {
                    const websiteP = document.createElement('p')
                    websiteP.className = "website";
                    const websiteSub = document.createElement('span');
                    websiteSub.textContent = "Website: ";
                    websiteSub.className = "pantry-card-subheader";
                    websiteP.append(websiteSub);
                    const websiteBody = document.createElement('span');
                    websiteBody.textContent = `${row.Website}`;
                    websiteBody.className = "website";
                    websiteP.append(websiteBody);
                    div.append(websiteP);
                    }
                    
                    if (row.Rating) {
                    const ratingP = document.createElement('p')
                    ratingP.className = "rating";
                    const ratingSub = document.createElement('span');
                    ratingSub.textContent = "Rating: ";
                    ratingSub.className = "pantry-card-subheader";
                    ratingP.append(ratingSub);
                    const ratingBody = document.createElement('span');
                    ratingBody.textContent = `${row.Rating}`;
                    ratingBody.className = "rating";
                    ratingP.append(ratingBody);
                    div.append(ratingP);
                    }
                    
                    dayCell.append(div);
                    // console.log("Added pantry to table")
                  }
                } 
              });
            }

        })

        fs.writeFile('schedule.html', dom.serialize(), function(err){
            if (err) throw err;
            console.log('schedule.html has been saved!');
        });
    });
  });


function addPantry(day, hours, tableRow) {

}