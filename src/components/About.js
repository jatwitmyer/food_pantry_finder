import React from "react";

function About() {
  return(
  <div id="about-content">
    <h2>About Us</h2>
    <div>
      {/* <h3>Our Mission</h3> */}
      <p>Food Pantry Finder was inspired by our team's experiences with helping others to find food pantries. Our website automates this task and arranges found pantries into a weekly schedule.</p>
    <p></p>
    </div>
    <div>
      <h3>Our Team</h3>
      <p>Meet the people who made Food Pantry Finder possible.</p>
      <div>
        <div>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
          <h4>Jessica Twitmyer</h4>
          <p>Jessica is a software engineer who loves to code and help others. She enjoys singing, puzzles, playing games with friends, and spending time with her family. Jessica worked as a specialist at 211 for two years, frequently assisting callers with finding food pantries in their area. She felt strongly that a digital assistant was needed after witnessing how long it takes to give a person resources for food pantries over the phone.</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
          <h4>Cooper Lindsley</h4>
          <p>Cooper is a software engineer who... </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About;