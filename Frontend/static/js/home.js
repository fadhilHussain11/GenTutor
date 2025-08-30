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
    alert(result["status"])

    // Redirect to result page
    window.location.href = "/subject";

});