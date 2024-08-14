import React from "react";

function LoadingAnimation() {
  return(
    <div id="loading-container" className="row-4">
      <p>Finding Results</p>
      <div id="progress" />
      {/* add loading bar here class="col-2cii" */}
      <p>Showing 0 of 9</p>
    </div>
  )
}

export default LoadingAnimation;