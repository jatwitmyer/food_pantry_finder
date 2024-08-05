const prompt = require("prompt-sync")();

// get address from the user using the command line
function getAddress() {
  let address = prompt("Please enter an address for your search: ")
  console.log(address)
  while (address == "") {
    address = prompt("No address entered. Please enter an address to continue: ")
  }
  const checkCorrect = prompt(`You entered: "${address}". Is this correct? Enter 'yes' or 'no': `)
  if (checkCorrect.toLowerCase() == "yes" || checkCorrect.toLowerCase() == "y") {
    console.log("address saved")
    return address
  }
  else {
    getAddress()
  }
}

getAddress()

export default getAddress;