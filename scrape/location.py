from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert 
import time
import csv

# Get the address from the user
country = input("Please enter a country: ")
zip_code = input("Please enter a zip code: ")

driver = webdriver.Chrome()

try:
    driver.get("https://www.latlong.net/convert-address-to-lat-long.html")
    driver.find_element(By.CLASS_NAME, 'width70').send_keys(f"{country}, {zip_code}")
    driver.find_element(By.XPATH, '//*[@title="Find lat long coordinates"]').click()
    while driver.find_element(By.ID, 'loading').is_displayed():
        time.sleep(1)
    latLong = driver.find_element(By.ID, 'latlngspan').get_attribute('innerHTML')
    # print(latLong)

    # Write the latLong variable to a CSV file
    with open('scrape/latlong.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        # writer.writerow(["LatLong"])
        writer.writerow([latLong])
except Exception:
    print("Exception Occurs")

driver.quit()

#in dom when loading
#<span id="loading" style="display: block;">Looking for the lat long, please wait...</span>

#in dom when loaded
#<span id="loading" style="display: none;">Looking for the lat long, please wait...</span>