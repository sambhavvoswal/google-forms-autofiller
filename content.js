// content.js - Runs only on docs.google.com/forms/*

function triggerInput(element, value) {
    if (!element || element.value === value) return;

    element.focus();
    element.value = value;

    element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.blur();

    element.style.transition = 'background-color 0.3s';
    element.style.backgroundColor = 'rgba(47, 129, 247, 0.1)';
    setTimeout(() => { element.style.backgroundColor = ''; }, 1000);
}

function normalizeText(text) {
    if (!text) return "";
    return text.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function tryAutofill() {
    chrome.storage.local.get(['customFields'], (data) => {
        const fields = data.customFields || [];
        if (fields.length === 0) return;

        // Pre-normalize all user-defined labels for faster matching
        const normalizedFields = fields.map(f => ({
            normLabel: normalizeText(f.label),
            value: f.value
        })).filter(f => f.normLabel !== "");

        if (normalizedFields.length === 0) return;

        const listItems = document.querySelectorAll('div[role="listitem"]');

        listItems.forEach(item => {
            const labelEl = item.querySelector('div[role="heading"] span') || item.querySelector('.M7eMe');
            if (!labelEl) return;

            const rawLabelText = labelEl.innerText;
            const normLabel = normalizeText(rawLabelText);

            let matchedValue = null;

            // Check if this form question matches any of our custom fields
            for (const field of normalizedFields) {
                // We use `.includes` so that a user entry like "Email" matches "Email Address"
                if (normLabel.includes(field.normLabel)) {
                    matchedValue = field.value;
                    break;
                }
            }

            if (matchedValue) {
                const inputEl = item.querySelector('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], .whsOnd, textarea');

                if (inputEl && !inputEl.value) {
                    triggerInput(inputEl, matchedValue);
                }
            }
        });
    });
}

let timeoutId = null;
function debouncedAutofill() {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        tryAutofill();
    }, 800);
}

const observer = new MutationObserver((mutations) => {
    let shouldRun = false;
    for (const m of mutations) {
        if (m.addedNodes.length > 0) {
            shouldRun = true;
            break;
        }
    }
    if (shouldRun) debouncedAutofill();
});

observer.observe(document.body, { childList: true, subtree: true });

setTimeout(tryAutofill, 500);
