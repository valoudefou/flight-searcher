<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="350"/>

# Flight Searcher

Welcome to the Flight Searcher repository! This app allows users to search for flights by specifying departure and destination cities, as well as the travel date. It's built with React Native and Expo.

## Getting Started

### Clone the Repository
Follow these instructions to clone the repository on your local machine.

1. Open Command Prompt or PowerShell.
2. Run the following command:

   ```bash
   git clone https://github.com/valoudefou/flight-searcher.git
   ```
3. Navigate to the project directory:

   ```bash
   cd flight-searcher
   ```

### Preview the App on Your Mobile Phone
This app is built with Expo, which makes it easy to preview your React Native app on Android and iOS devices.

1. Install the Expo Go app on your mobile phone:
   - [Expo Go for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Expo Go for iOS](https://apps.apple.com/us/app/expo-go/id982107779)

2. Start the Expo server:
   ```bash
   npm install
   npm start
   ```
   This will start the development server and show a QR code in the terminal or the Expo Developer Tools in your browser.

3. Scan the QR code:
   - For Android: Open Expo Go and scan the QR code from your terminal or browser.
   - For iOS: Use the camera app to scan the QR code and tap the link to open it in Expo Go.

Now you can see the app live on your mobile device!

## AB Tasty Flag Keys and Values

| Flag Key                     | Possible Values                                   |
|------------------------------|---------------------------------------------------|
| `flagSeatRemaining`          | BOOLEAN to display the feature `true` or `false`         |
| `flagSeatRemainingMessageColor` | STRING values: `green`, `black`, `orange`, `red` |
| `flagPercentageDiscount`     | Any INTEGER value (e.g., `0.9` for 10% OFF, `0.8`, `0.7`)          |
| `flagDiscountSeatLeftHigherThan`     | Any INTEGER value (e.g., `10`, `20`, `50`)          |
| `flagDiscountIfPriceHigherThan`     | Any INTEGER value (e.g., `500`, `1000`, `2000`)          |
| `flagSortByPrice`     | BOOLEAN to sort highest prices first `true` or `false`          |
| `flagSortBySeatLeft`     | BOOLEAN to sort by most seats left first `true` or `false`          |

# Usage

<img src="https://s1.ezgif.com/tmp/ezgif-1-3504d91ad3.gif" alt="AB Tasty logo" width="350" loading="lazy" />

In this section, you can explain how to use the application or widget. If there is a specific flow or step that users need to follow, it should be outlined here. 

### Explore

The context of the user can be added under the "Explore" section. The possible contexts are as follows:

- **App**: This can be set to `"Beta"` as a STRING, representing the version of the application.
- **User**: This can be set to `"Returning"` as a STRING, indicating that the user has previously interacted with the application.
- **Location**: This can be set to `"US"` as a STRING, denoting the geographic location of the user.

By configuring these values, the app will tailor the experience to match the specific context of the user.

## Enjoy!

Feel free to explore, contribute, and share your feedback. 🚀✈️
