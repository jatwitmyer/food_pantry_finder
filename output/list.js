const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file and parse it into a JavaScript object
const data = [];
fs.createReadStream('/home/clindsley/Development/Food/food_pantry_finder/pantries.csv')
  .pipe(csv())
  .on('data', (row) => data.push(row))
  .on('end', () => {
    // Generate the HTML content based on the parsed data
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Weekly Schedule</title>
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
      htmlContent += `
        <li>
          <div>
            <h3 style="margin-bottom: 0; padding-bottom: 0;"><strong>${row.name}</strong></h3>
            <div>Address: ${row.address}</div>
            <div>&nbsp;</div>
            <div>Hours: ${row.hours}</div>
            <p>Phone: ${row.phone}
              <br />
              <span>
                Website:
                <a href="${row.website}">${row.website}</a>
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