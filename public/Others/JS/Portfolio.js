document.getElementById("fileInput").addEventListener("change", function () {

    const file = this.files[0];
    const preview = document.getElementById("preview");

    if (!file) return;

    preview.innerHTML = "";

    const url = URL.createObjectURL(file);

    // Image
    if (file.type.startsWith("image/")) {

        preview.innerHTML = `
            ${url}

            <div class="file-info">
                <p><strong>Name:</strong> ${file.name}</p>
                <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
            </div>
        `;
    }

    // PDF
    else if (file.type === "application/pdf") {

        preview.innerHTML = `
            ${url}

            <div class="file-info">
                <p><strong>Name:</strong> ${file.name}</p>
            </div>
        `;
    }

    // Video
    else if (file.type.startsWith("video/")) {

        preview.innerHTML = `
            <video controls width="100%">
                <source src=           Your browser does not support video playback.
            </video>

            <div class="file-info">
                <p><strong>Name:</strong> ${file.name}</p>
            </div>
        `;
    }

    // Text
    else if (file.type.startsWith("text/")) {

        fetch(url)
            .then(response => response.text())
            .then(text => {
                preview.innerHTML = `
                    <pre>${text}</pre>

                    <div class="file-info">
                        <p><strong>Name:</strong> ${file.name}</p>
                    </div>
                `;
            });
    }

    // Others
    else {

        preview.innerHTML = `
            <div class="file-info">
                <p><strong>File Name:</strong> ${file.name}</p>
                <p><strong>File Type:</strong> ${file.type}</p>
                <p><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                <p>Preview not supported.</p>
            </div>
        `;
    }

});