console.log('this works');

const btn = document.querySelector('button');
const result = document.querySelector('#result');

// callback function
const getGPSLocation = event => {
    console.log("page is fully loaded");
    // get the current position
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        console.log('not supported')
    }
    
}

// handle success
const onSuccess = position => {
    console.log(position)
    const { latitude, longitude } = position.coords
    result.textContent = `${latitude} , ${longitude}`
}

// handle success
const onError = () => {
    console.log('error')
}

// event listener
btn.addEventListener("click", getGPSLocation);