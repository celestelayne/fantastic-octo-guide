console.log('this works');

// callback function
const getGPSLocation = event => {
    console.log("page is fully loaded");
}

// event listener
window.addEventListener("load", getGPSLocation);