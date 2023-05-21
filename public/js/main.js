let s = "";
const sizeButton = document.getElementById("sizeButton");
const spinner = document.getElementById('spinner');
const generateButton = document.getElementById('generateButton');

function setSize(size) {
  s = size;
  sizeButton.textContent = size.charAt(0).toUpperCase() + size.slice(1);
  console.log(size);
}

function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = '';
  document.querySelector("#image").src = '';

  const prompt = document.querySelector("#prompt").value;
  const size = s;

  if (prompt === "") {
    alert("Please enter some text");
    return;
  }
  
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size){
    try {
        showSpinner();
        const response = await fetch('/openai/generateimage', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                prompt,
                size
            })
        });

        if(!response.ok){
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();
        
        const imageUrl = data.data;
        document.querySelector("#image").src = imageUrl;

        document.querySelector("#prompt").value = "";
        removeSpinner();

    } catch (error) {
        document.querySelector('.msg') = error;
    }
}

function showSpinner() {
    spinner.classList.remove('d-none');
    generateButton.disabled = true;
}

function removeSpinner() {
    spinner.classList.add('d-none');
    generateButton.disabled = false;
}