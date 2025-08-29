window.onload = function () {
  // Get stored syllabus JSON
  let data = localStorage.getItem("pdfTable");
  if (!data) {
    document.getElementById("syllabus-container").innerHTML = "<p>No data found. Please upload again.</p>";
    return;
  }

  let syllabus = JSON.parse(data);

  // Set course title
  document.getElementById("course-title").innerText = syllabus.name;

  // Render syllabus
  let container = document.getElementById("syllabus-container");

  Object.keys(syllabus).forEach(key => {
    if (key !== "name") {
      let unitDiv = document.createElement("div");
      unitDiv.classList.add("unit");

      let title = document.createElement("h2");
      title.innerText = key;
      unitDiv.appendChild(title);

      let list = document.createElement("ul");
      syllabus[key].forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
      });

      unitDiv.appendChild(list);
      container.appendChild(unitDiv);
    }
  });
};

function goBack() {
  window.location.href = "home.html"; // change if your first page has another name
}
