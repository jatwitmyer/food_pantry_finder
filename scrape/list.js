const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file and parse it into a JavaScript object
const data = [];
fs.createReadStream('./pantries.csv')
  .pipe(csv())
  .on('data', (row) => data.push(row))
  .on('end', () => {
    // Generate the HTML content based on the parsed data
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Local Food Pantries Weekly Schedule</title>
          <style>
              table {
                  width: 100%;
                  border-collapse: collapse;
              }
              th, td {
                  border: 1px solid black;
                  padding: 15px;
                  text-align: center;
              }
              p {
                margin: 5px;
                margin-left: 10px;
              }
              div {
                margin-bottom: 30px;
              }
              .hours {
                margin: 15px;
                margin-left: 10px;
              }
          </style>
      </head>
      <body>
          <h1>Local Food Pantries</h1>
          <ul>
    `;

    data.forEach((row) => {
      let hours = row.Hours.replace('Hide open hours for the week', '');
      htmlContent += `
        <li>
          <div>
            <h3 style="margin-bottom: 0; padding-bottom: 0;"><strong>${row.Name}</strong></h3>`
      if (row.Address) {
        htmlContent += `
            <p><b>Address:</b> ${row.Address}</p>`
      }

      if (row.Hours) {
        htmlContent += `
            <p class="hours"><b>Hours:</b> ${hours}</p>`
      }

      if (row.Phone) {
        htmlContent += `
            <p><b>Phone:</b> ${row.Phone} <p>`
      }

      if (row.Website) {
        htmlContent += `
              <p>
                <b>Website:</b>
                <a href="${row.Website}">${row.Website}</a>
              </p>`
      }

      htmlContent += `
          </div>
        </li>
      `;
    });

    htmlContent += `
    </ul>
    </body>
    </html>
    `

    // Write the generated HTML content to an HTML file
    fs.writeFile('output.html', htmlContent, (err) => {
      if (err) throw err;
      console.log('list.html has been saved!');
    });
  });