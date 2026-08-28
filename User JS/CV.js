
const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");

// Click triggers file input
uploadBox.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => uploadFiles(fileInput.files));

// Drag & drop
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("dragover");
});
uploadBox.addEventListener("dragleave", () => uploadBox.classList.remove("dragover"));
uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("dragover");
  uploadFiles(e.dataTransfer.files);
});

// attributes to progress bar
progressBar.setAttribute("aria-valuenow", percent);
progressBar.setAttribute("aria-valuemax", 100);

// Upload with real progress
function uploadFiles(files) {
  if (!files.length) return;

  const formData = new FormData();
  formData.append("cv", files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/uploadCV", true);

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      progressContainer.style.display = "block";
      progressBar.style.width = percent + "%";
    }
  };

  xhr.onload = () => {
    progressContainer.style.display = "none";
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      renderCV(data);
    } else {
      console.error("Upload failed:", xhr.responseText);
    }
  };

  xhr.send(formData);
}

// Render CV
function renderCV(data) {
  const container = document.getElementById("cvContainer");
  container.innerHTML = `
    <header>
      <h1>${data.name || ""}</h1>
      <p>${data.email || ""} | ${data.phone || ""}</p>
    </header>
    <section>
      <h2>Raw CV Text</h2>
      <p>${data.raw_text || ""}</p>
    </section>
  `;
}

// Theme switching
document.getElementById("themeSelector").addEventListener("change", (e) => {
  document.getElementById("cvContainer").className = e.target.value;
});

// Auto-fetch saved CV
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/getCV");
  if (response.ok) {
    const data = await response.json();
    if (data && data.CVRawText) {
      renderCV({
        name: data.CVName,
        email: data.CVEmail,
        phone: data.CVPhone,
        raw_text: data.CVRawText
      });
    }
  }
});

// Download as PDF
document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("cvContainer");
  const opt = {
    margin: 0.5,
    filename: "DigitalCV.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
  };
  html2pdf().set(opt).from(element).save();
});
