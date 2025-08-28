$(document).ready(function() {
    // Unit options for each subject
    const unitOptions = {
        math: ["Unit 1: Algebra", "Unit 2: Geometry", "Unit 3: Calculus", "Unit 4: Statistics", "Unit 5: Trigonometry"],
        physics: ["Unit 1: Mechanics", "Unit 2: Thermodynamics", "Unit 3: Electromagnetism", "Unit 4: Optics", "Unit 5: Quantum Physics"],
        chemistry: ["Unit 1: Atomic Structure", "Unit 2: Chemical Bonding", "Unit 3: Organic Chemistry", "Unit 4: Thermodynamics", "Unit 5: Electrochemistry"],
        biology: ["Unit 1: Cell Biology", "Unit 2: Genetics", "Unit 3: Ecology", "Unit 4: Human Physiology", "Unit 5: Evolution"],
        history: ["Unit 1: Ancient Civilizations", "Unit 2: Medieval Period", "Unit 3: Renaissance", "Unit 4: Industrial Revolution", "Unit 5: Modern History"]
    };

    // When subject changes, update unit dropdown
    $('#subject-dropdown').change(function() {
        const subject = $(this).val();
        const $unitDropdown = $('#unit-dropdown');
        
        $unitDropdown.empty();
        
        if (subject) {
            $unitDropdown.append('<option value="">-- Select a unit --</option>');
            
            // Add units for selected subject
            unitOptions[subject].forEach(function(unit, index) {
                $unitDropdown.append(`<option value="unit${index+1}">${unit}</option>`);
            });
            
            $unitDropdown.prop('disabled', false);
            $('#select-button').prop('disabled', true);
        } else {
            $unitDropdown.append('<option value="">-- Select subject first --</option>');
            $unitDropdown.prop('disabled', true);
            $('#select-button').prop('disabled', true);
        }
    });

    // Enable select button when unit is chosen
    $('#unit-dropdown').change(function() {
        $('#select-button').prop('disabled', !$(this).val());
    });

    // Handle select button click
    $('#select-button').click(function() {
        const subject = $('#subject-dropdown option:selected').text();
        const unit = $('#unit-dropdown option:selected').text();
        
        alert(`Selected: ${subject} - ${unit}`);
        // Here you would typically redirect or load content
        // window.location.href = `/content?subject=${$('#subject-dropdown').val()}&unit=${$('#unit-dropdown').val()}`;
    });
});