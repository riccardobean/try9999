const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    const indicator = input.nextElementSibling;

    if (input.type !== 'radio' && input.type !== 'checkbox' && input.required) {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'red';
                indicator.style.backgroundColor = 'red';
            } else if (input.validity.valid) {
                input.style.borderColor = 'green';
                indicator.style.backgroundColor = 'green';
            } else {
                input.style.borderColor = 'orange';
                indicator.style.backgroundColor = 'orange';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = input.style.borderColor || '#ccc';
            indicator.style.backgroundColor = input.style.borderColor;
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = 'red';
                indicator.style.backgroundColor = 'red';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const otherRadio = document.getElementById('reasonOther');
    const reasonOtherInput = document.getElementById('reason-other');
    const reasonRadios = document.querySelectorAll('input[name="reason"]');

    // Disable the "Other" input initially if another radio is selected
    function updateOtherInputState() {
        if (otherRadio.checked) {
            reasonOtherInput.disabled = false; // Enable the "Other" input if "Other" is selected
        } else {
            reasonOtherInput.disabled = true; // Disable "Other" input if any other radio is selected
        }
    }

    // Event listener to update the state when a radio button is selected
    reasonRadios.forEach(radio => {
        radio.addEventListener('change', updateOtherInputState);
    });

    // Initial state check in case the page is refreshed with a pre-selected radio
    updateOtherInputState();
});

document.addEventListener('DOMContentLoaded', function () {
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const nextButton = document.getElementById('validate');
    const backButton = document.getElementById('back');
    const errorMessage = document.getElementById('form1-error-message');

    // Move to Form2 when "Next" is clicked
    nextButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Check if all inputs in form1 are valid
        const form1Inputs = form1.querySelectorAll('input:required');
        let isValid = true;

        form1Inputs.forEach(input => {
            if (!input.validity.valid) {
                isValid = false;
                input.style.borderColor = 'red'; // Highlight invalid fields
            }
        });

        if (isValid) {
            form1.style.display = 'none'; // Hide Form1
            form2.style.display = 'block'; // Show Form2
            errorMessage.style.display = 'none'; // Hide error message if previously shown
        } else {
            errorMessage.textContent = 'Please fill out all required fields correctly.';
            errorMessage.style.display = 'block'; // Show error message
        }
    });

    // Return to Form1 when "Back" is clicked
    backButton.addEventListener('click', function () {
        form2.style.display = 'none'; // Hide Form2
        form1.style.display = 'block'; // Show Form1
    });
});
