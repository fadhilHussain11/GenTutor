document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/subject")
    .then(response => response.json())
    .then(data => {
      console.log("Syllabus data:", data);
      renderDropdowns(data);
    })
    .catch(error => console.error("Error fetching syllabus:", error));
});

function renderDropdowns(data) {
  const unitDropdown = document.getElementById("unit-dropdown");
  const subjectDropdown = document.getElementById("subject-dropdown");
  const selectButton = document.getElementById("select-button");

  // Clear old options
  unitDropdown.innerHTML = "";
  subjectDropdown.innerHTML = "<option value=''>-- Select subject first --</option>";
  subjectDropdown.disabled = true;
  selectButton.disabled = true;


    unitDropdown.innerHTML = `<option value="">-- Select a unit --</option>`;
    Object.keys(data).forEach(key => {
        if (key !== "name") {
          unitDropdown.innerHTML += `<option value="${key}">${key}</option>`;
        }
      });

  // When subject changes
  unitDropdown.addEventListener("change", () => {
    const unit = unitDropdown.value;

    subjectDropdown.innerHTML = "";
    if (unit) {
      subjectDropdown.innerHTML = `<option value="">-- Select a topic --</option>`;

      // Add each unit from syllabus JSON
      data[unit].forEach(item => {
        subjectDropdown.innerHTML += `<option value="${item}">${item}</option>`;
      });

      subjectDropdown.disabled = false;
      selectButton.disabled = true;
    } else {
      subjectDropdown.innerHTML = "<option value=''>-- Select subject first --</option>";
      subjectDropdown.disabled = true;
      selectButton.disabled = true;
    }
  });

  // Enable button when unit is chosen
  subjectDropdown.addEventListener("change", () => {
    selectButton.disabled = !subjectDropdown.value;
  });

  // Handle button click
  selectButton.addEventListener("click", () => {
    const unit = unitDropdown.value;
    const subject = subjectDropdown.value;

    alert(`Selected:\nUnit: ${unit}\nSubject: ${subject}\n`);

    // Example: redirect with query params
    // window.location.href = `/content?subject=${subject}&unit=${unit}`;
  });
}
