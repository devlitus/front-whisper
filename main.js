import Dropzone from "dropzone";

let myDropzone = new Dropzone("#form");
let textArea = document.getElementById("transcript");

myDropzone.on("addedfile", async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const reponse = await fetch("http://127.0.0.1:5000/whisper", {
      method: "POST",
      "Content-Type": "multipart/form-data",
      body: formData,
    });
    const { results } = await reponse.json();
    if (results[0].length < 0) {
      console.log("loading");
      textArea.value += "Loading...";
    }
    textArea.value += await results[0].transcript;
    return results[0].transcript;
  } catch (error) {
    return new Error(error);
  }
});
