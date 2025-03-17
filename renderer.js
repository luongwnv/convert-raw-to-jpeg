document.addEventListener("DOMContentLoaded", () => {
  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("file-input");
  const fileButton = document.getElementById("file-button");
  const convertButton = document.getElementById("convert-button");
  const preview = document.getElementById("preview");
  const progress = document.createElement("p");
  preview.appendChild(progress);

  let selectedFile = null;
  const { ipcRenderer } = require("electron");

  fileButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (event) =>
    handleFile(event.target.files[0])
  );

  dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () =>
    dropArea.classList.remove("dragover")
  );

  dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("dragover");
    if (event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
    }
  });

  function handleFile(file) {
    if (file && file.name.toLowerCase().endsWith(".arw")) {
      selectedFile = file;
      preview.innerHTML = `<p>Selected file: ${file.name}</p>`;
      preview.appendChild(progress);
      convertButton.disabled = false;
    } else {
      preview.innerHTML =
        "<p style='color:red;'>Invalid file type. Please select an ARW file.</p>";
      convertButton.disabled = true;
    }
  }

  convertButton.addEventListener("click", () => {
    if (selectedFile) {
      progress.innerText = "Starting conversion...";
      ipcRenderer.send("convert-arw-to-jpeg", selectedFile.path);
    }
  });

  ipcRenderer.on("conversion-progress", (event, message) => {
    progress.innerText = message;
  });

  ipcRenderer.on("conversion-success", (event, outputPath) => {
    progress.innerHTML = `<span style="color:green;">Conversion Complete!</span><br>Saved at: ${outputPath}`;
  });

  ipcRenderer.on("conversion-error", (event, errorMessage) => {
    progress.innerHTML = `<span style="color:red;">Error: ${errorMessage}</span>`;
  });
});
