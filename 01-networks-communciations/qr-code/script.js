console.log('this works');

// Structure
//----------------------------
const form = document.querySelector("form");
const input = document.querySelector("input");
const wrapper = document.querySelector(".qr-code-wrapper")

// Event Handlers
//----------------------------
const getQrCode = (event) => {
  event.preventDefault();

  // variable for values entered in the form
  const qrInput = input.value;

  let URL = `https://www.${qrInput}.com`

  // make the QR code
  let qr = qrcode(0, "L");
  qr.addData(URL);
  qr.make();

  // create an image from it
  let qrCodeImage = qr.createImgTag()

  // append it to the wrapper
  wrapper.innerHTML= qrCodeImage
	//clear form
	form.reset();
}

// Events
//----------------------------
form.addEventListener("submit", getQrCode);