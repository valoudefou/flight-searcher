<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="350"/>

# Flight Searcher

Welcome to the Flight Searcher repository! This app lets users search for flights by departure city, destination, and travel date, built with React Native and Expo.

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

| Flag Key                         | Values                                        | Scope |
|----------------------------------|--------------------------------------------------------|-------|
| `flagSeatRemaining`              | BOOLEAN to display the feature `true` or `false`       | macro |
| `flagSeatRemainingMessageColor`  | STRING values: `green`, `black`, `orange`, `red`       | micro |
| `flagPercentageDiscount`         | Any INTEGER value (e.g., `0.9` for 10% OFF, `0.8`, `0.7`) | micro |
| `flagDiscountSeatLeftHigherThan` | Any INTEGER value (e.g., `10`, `20`, `50`)             | micro |
| `flagDiscountIfPriceHigherThan`  | Any INTEGER value (e.g., `500`, `1000`, `2000`)        | micro |
| `flagSortByPrice`                | BOOLEAN to sort highest prices first `true` or `false` | micro |
| `flagSortBySeatLeft`             | BOOLEAN to sort by most seats left first `true` or `false` | micro |

The AB Tasty interface allows you to easily configure flags and structure a JSON response with various data types, including INTEGER, STRING, BOOLEAN, ARRAY, and OBJECT.

<img src="https://assets-manager.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167/flags.png" alt="AB Tasty interface" width="950"/>

### Explore

To activate the flags configured in the AB Tasty trial account, the user's context must be incorporated under the "Explore" section. Currently, the flags will only be triggered if the user meets the following targeting criteria:

- Key `App` can be set to `Beta`, representing an hypothetical application version to serve a flag.
- Key `User` can be set be set to `Returning`, hypothetically indicating that the user has previously interacted with the application.
- Key `Location` can be set to `US`, denoting the geographic location of the user.

The AB Tasty interface lets you activate flags based on user data types (INTEGER, STRING, BOOLEAN) to personalize the app experience according to user context and business logic.

<img src="https://assets-manager.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167/interface.png" alt="AB Tasty interface" width="950"/>

## Usage

<img src="https://assets-manager.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167/anim.gif" alt="Application demo" width="400" />

## Enjoy!

Feel free to explore, contribute, and share your feedback. 🚀✈️
