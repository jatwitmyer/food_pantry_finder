import  mechanicalsoup


browser = mechanicalsoup.StatefulBrowser()
browser.open("https://www.latlong.net/convert-address-to-lat-long.html")
# print(browser.page)

browser.select_form("form[id='Ke1721']")

browser.form.print_summary()