import Dropzone from "dropzone";

let myDropzone = new Dropzone("#form");
let textArea = document.getElementById("transcript");
let spinner = document.querySelector(".spinner");


myDropzone.on("processing", function (file) { 
  myDropzone.removeAllFiles();
  spinner.style.display = "inline";
});





myDropzone.on("addedfile", async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:5000/whisper", {
      method: "POST",
      "Content-Type": "multipart/form-data",
      body: formData,
    });
    
    if (response.status !== 200) {
      throw new Error("Error");
    }
    const { results } = await response.json();
    if (results[0].length < 0) {
      textArea.value += "Loading...";
    }
    spinner.style.display = "none";
    textArea.value += await results[0].transcript;
    return results[0].transcript;
  } catch (error) {
    return new Error(error);
  }
});
