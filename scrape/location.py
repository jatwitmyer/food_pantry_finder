from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert 
import time

driver = webdriver.Chrome()
try: 
    driver.get("https://www.latlong.net/convert-address-to-lat-long.html")
    driver.find_element(By.CLASS_NAME, 'width70').send_keys("United States, 33647")
    driver.find_element(By.XPATH, '//*[@title="Find lat long coordinates"]').click()
    time.sleep(1)
    while driver.find_element(By.ID, 'loading').is_displayed():
        time.sleep(1)
    latLong = driver.find_element(By.ID, 'latlngspan').get_attribute('innerHTML')
    print(latLong)
    # print(driver.page_source)
except Exception:
    print("Exception Occurs")

driver.quit()

#in dom when loading
#<span id="loading" style="display: block;">Looking for the lat long, please wait...</span>

#in dom when loaded
#<span id="loading" style="display: none;">Looking for the lat long, please wait...</span>