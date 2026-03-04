# Google Forms AutoFiller

A lightweight, efficient Chrome extension designed to save you time by automatically filling out Google Forms with your predefined, custom data.

## Features

- **Automated Data Entry**: Instantly autofill repetitive fields like Name, Email, Phone Number, College, etc.
- **Customizable Fields**: Map your own data to form questions using a simple, intuitive popup interface interface. Matches are smart; setting "Email" will match forms asking for "Email Address".
- **Visual Feedback**: Autofilled fields briefly flash light blue, so you know exactly which fields were populated by the extension.
- **Privacy First & Exclusive**: Runs exclusively on `docs.google.com/forms/*`. Your data is saved locally to your browser and never sent anywhere else.

## Installation (Unpacked Extension)

Since this extension isn't on the Chrome Web Store yet, you can run it locally:

1. Clone or download this repository to your local machine.
   ```bash
   git clone https://github.com/sambhavvoswal/google-forms-autofiller.git
   ```
2. Open Google Chrome.
3. Navigate to `chrome://extensions/` in your address bar.
4. Turn on **Developer mode** (the toggle switch in the top right corner).
5. Click **Load unpacked** in the top left corner.
6. Select the folder containing the downloaded extension files (`google-forms-autofiller`).
7. The extension icon should now appear in your browser toolbar!

## Usage

1. **Configure Your Data**: Click the extension icon in your Chrome toolbar.
2. **Add Fields**: Use the popup to add custom fields. 
   - **Label**: Enter part of the expected form question (e.g., "Email").
   - **Value**: Enter what should be filled in (e.g., "myemail@example.com").
3. **Save**: Click "Save All Fields".
4. **Test it Out**: Navigate to any Google Form. Wait a second, and watch the extension magically autofill the inputs matching your labels!

## Under the Hood

The extension utilizes standard web technologies:
*   **HTML/CSS/JS**: For the customizable popup dashboard (`popup.html`, `popup.css`, `popup.js`).
*   **Chrome Storage API**: Uses `chrome.storage.local` to securely persist user details.
*   **Content Scripts**: `content.js` runs when navigating to Google Forms. It utilizes a `MutationObserver` to ensure forms are filled even if the form is loaded dynamically by the browser. 

## License

This project is open-source and available under the [MIT License](LICENSE).
