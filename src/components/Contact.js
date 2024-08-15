import React from "react";

function Contact() {
  return(
  <div id="contact-content">
  <h2>Contact Us</h2>
  <p>Have questions? Find a bug? Email us at [insert email here] or fill out the form below.</p>
  <form>
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" required />
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" required />
    <label htmlFor="message">Message:</label>
    <textarea id="message" name="message" required />
    <input type="submit" id="submit" defaultValue="Submit" />
  </form>
  
  </div>
  )
}

export default Contact;