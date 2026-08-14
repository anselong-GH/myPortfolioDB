
const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");
const preview = document.getElementById("preview");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");

// Click on upload box triggers file input
uploadBox.addEventListener("click", () => fileInput.click());

// Handle file selection
fileInput.addEventListener("change", () => handleFiles(fileInput.files));

// Drag & drop events
uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("dragover");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("dragover");
});

uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
});

// Process files with progress bar
function handleFiles(files) {
    if (!files.length) return;
    preview.innerHTML = "";

    // Show progress bar
    progressContainer.style.display = "block";
    progressBar.style.width = "0%";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(interval);
            progressContainer.style.display = "none"; // hide when done
            displayFiles(files);
        }
    }, 150); // simulate progress every 150ms
}

// Display files after "upload"
function displayFiles(files) {
    Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);

        const fileInfo = `
            <div class="file-info">
                <p><strong>Name:</strong> ${file.name}</p>
                <p><strong>Type:</strong> ${file.type}</p>
                <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                <a href="${url}" download="${file.name}" class="download-btn">Download</a>
            </div>
        `;

        let filePreview = "";

        if (file.type.startsWith("image/")) {
            filePreview = `<img src="${url}" alt="${file.name}" />`;
        } else if (file.type === "application/pdf") {
            filePreview = `<iframe src="${url}"></iframe>`;
        } else if (file.type.startsWith("video/")) {
            filePreview = `
                <video controls>
                    <source src="${url}" type="${file.type}">
                    Your browser does not support video playback.
                </video>
            `;
        } else if (file.type.startsWith("text/")) {
            fetch(url)
                .then(res => res.text())
                .then(text => {
                    const wrapper = document.createElement("div");
                    wrapper.classList.add("preview-item");
                    wrapper.innerHTML = `<pre>${text}</pre>${fileInfo}`;
                    preview.appendChild(wrapper);
                });
            return;
        } else {
            filePreview = `<p>Preview not supported for this file type.</p>`;
        }

        const wrapper = document.createElement("div");
        wrapper.classList.add("preview-item");
        wrapper.innerHTML = filePreview + fileInfo;
        preview.appendChild(wrapper);
    });
}
