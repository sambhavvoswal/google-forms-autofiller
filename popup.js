document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('autofill-form');
    const container = document.getElementById('dynamic-fields-container');
    const addBtn = document.getElementById('add-btn');
    const statusMessage = document.getElementById('status-message');
    const template = document.getElementById('field-row-template');

    // Function to add a single row
    function createRow(labelText = '', valueText = '') {
        const clone = template.content.cloneNode(true);
        const row = clone.querySelector('.form-row');
        const labelInput = clone.querySelector('.field-label');
        const valueInput = clone.querySelector('.field-value');

        labelInput.value = labelText;
        valueInput.value = valueText;

        container.appendChild(clone);
    }

    // Load saved data
    chrome.storage.local.get(['customFields'], (data) => {
        const fields = data.customFields || [];

        if (fields.length === 0) {
            // Provide at least one empty row if nothing is saved
            createRow();
        } else {
            fields.forEach(field => {
                createRow(field.label, field.value);
            });
        }
    });

    // Handle adding new rows
    addBtn.addEventListener('click', () => {
        createRow();
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    });

    // Handle removing rows (event delegation)
    container.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-btn');
        if (removeBtn) {
            const row = removeBtn.closest('.form-row');
            row.remove();
        }
    });

    // Save data on submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const rows = container.querySelectorAll('.form-row');
        const customFields = [];

        rows.forEach(row => {
            const label = row.querySelector('.field-label').value.trim();
            const value = row.querySelector('.field-value').value.trim();

            if (label && value) {
                customFields.push({ label, value });
            }
        });

        chrome.storage.local.set({ customFields }, () => {
            // Show success message
            statusMessage.classList.add('show');
            setTimeout(() => {
                statusMessage.classList.remove('show');
            }, 3000);
        });
    });
});
