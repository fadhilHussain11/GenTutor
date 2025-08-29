document.getElementById("uploadForm").addEventListener("submit",async function(e) {
    e.preventDefault();

    let fileInput = document.getElementById("pdf-upload");
    let formData = new FormData();
    formData.append("syllabus_files", fileInput.files[0]);

    // Send to Flask
    let response = await fetch("/upload_syllabus", {
        method: "POST",
        body: formData
    });

    let result = await response.json();
    alert(result)

    // Store result in localStorage to use in another page
    localStorage.setItem("pdfTable", JSON.stringify(result.table));

    // Redirect to result page
    window.location.href = "/syllabus";

});