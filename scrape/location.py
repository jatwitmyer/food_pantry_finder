import  mechanicalsoup
from bs4 import BeautifulSoup


browser = mechanicalsoup.StatefulBrowser()
browser.open("https://www.latlong.net/convert-address-to-lat-long.html")

# Assuming the input has an class attribute
input_class = "width70"

# Get the form
form = browser.select_form()
browser.form.print_summary()

# browser["input"] = "1600 Amphitheatre Parkway, Mountain View, CA"
browser.form.set_input({"class": input_class}, "1600 Amphitheatre Parkway, Mountain View, CA")
# browser.form.print_summary()

# # Get the BeautifulSoup representation of the form
# soup_form = BeautifulSoup(str(form.form), 'html.parser')

# # Find the input element
# input_element = soup_form.find('input', {'class': input_class})

# # Check if the input element was found
# if input_element:
#     # Set the value of the input element
#     input_element['value'] = "1600 Amphitheatre Parkway, Mountain View, CA"
#     print(input_element)
#     # browser.launch_browser()
#     browser.form.print_summary()
# else:
#     print(f"No input element with id '{input_class}' found")