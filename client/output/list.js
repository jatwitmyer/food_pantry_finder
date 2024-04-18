const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file and parse it into a JavaScript object
const data = [];
fs.createReadStream('server/pantries.csv')
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
            <h3 style="margin-bottom: 0; padding-bottom: 0;"><strong>${row.Name}</strong></h3>
            <div>Address: ${row.Address}</div>
            <div>&nbsp;</div>
            <div>Hours: ${hours}</div>
            <p>Phone: ${row.Phone}
              <br />
              <span>
                Website:
                <a href="${row.Website}">${row.Website}</a>
              </span>
            </p>
          </div>
        </li>
      `;
    });

    htmlContent += `
          </ul>
      </body>
      </html>
    `;

    // Write the generated HTML content to an HTML file
    fs.writeFile('output.html', htmlContent, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });