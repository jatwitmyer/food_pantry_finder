# Food Pantry Finder
*By Cooper Lindsley and Jessica Twitmyer*

## Mission
Our goal is to provide a tool to quickly locate food pantries and organize the information into a PDF. We want to make it easy for people to find the resources they need to feed themselves and their families.

Currently, if a person needs assistance in finding food services, they must do so over the phone with 2-1-1 or through an established connection with a social worker. These methods are reliable sources of care, but are time-consuming for the user, and hunger can't wait. We seek to expedite the search process with an easy-to-use tool that anyone with an internet connection can access.

Our program utilizes web-scraping to collect and organize data from google maps. We offer two visualizations of the data: a list and a weekly schedule. A user can choose to save the information as a PDF for future reference.

## Prototype Demonstration
### List
![List](images/list_prototype.png)
### Schedule
![Schedule](images/schedule_prototype.png)

## Existing Features
- Scrapes google maps for the first eight search results for a hard-coded location and search (food pantries in Lancaster, PA) (main.js -> pantries.csv)
- Organizes scraped data into a list (list.js -> output.html)
- Organizes scraped data into a weekly schedule (schedule.js -> schedule.html)

## Upcoming Features
- Web-hosting of our front-end and virtual machine with AWS.
  - The virtual machine will receive a data request from the front-end, carry out the web-scraping, and return the data.
- Allow user to input their location and distance to personalize search results.
- Allow user to edit the data for inaccuracies or missing details.

## Install Dependencies
  1. npm install
    -requires node.js

### Run the Program
  1. cd scrape
  2. npm run scrape
