console.log('this works');

const btn = document.querySelector('button');
const result = document.querySelector('#result');
// const gps_camera = document.querySelector("[gps-new-camera]");
const ar_scene = document.querySelector("a-scene")

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

    // create a box
    const entity = document.createElement("a-box");
    entity.setAttribute("scale", {
        x: 10,
        y: 10, 
        z: 10
    })
    entity.setAttribute("material", { color: "red"})
    entity.setAttribute("gps-new-entity-place", {
        latitude: latitude + 0.001,
        longitude: longitude
    })
    // result.textContent = `${latitude} , ${longitude}`

    ar_scene.appendChild(entity);
}

// handle success
const onError = () => {
    console.log('error')
}

// event listener
btn.addEventListener("click", getGPSLocation);