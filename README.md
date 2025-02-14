# Japan Crafts App

## Overview

Japan Crafts App is a mobile application built with React Native that showcases traditional Japanese crafts. It offers users an immersive experience to explore various crafts, learn about their history, and appreciate their cultural significance.

## Features

- **Explore Crafts**: Browse a curated list of traditional Japanese crafts with detailed descriptions and images.
- **Favorites**: Save your favorite crafts for quick access.
- **Search Functionality**: Easily find crafts by name or category.

## File Structure

The project is organized as follows:

```
JapanCraftsApp/
├── App.js
├── package.json
├── README.md
├── node_modules/
├── assets/
│   ├── images/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── CraftCard.js
│   │   ├── CraftList.js
│   │   └── Header.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── CraftDetailScreen.js
│   │   └── FavoritesScreen.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── data/
│   │   └── crafts.js
│   └── styles/
│       └── styles.js
└── android/
└── ios/
└── windows/
```

- **App.js**: Entry point of the application.
- **package.json**: Contains project metadata and dependencies.
- **node_modules/**: Directory where npm packages are installed.
- **assets/**: Contains static assets like images and fonts.
- **src/**: Contains the main source code for the application.
  - **components/**: Reusable components used across screens.
  - **screens/**: Components representing different screens of the app.
  - **navigation/**: Configuration for app navigation.
  - **data/**: Static data used in the app.
  - **styles/**: Style definitions for the app.
- **android/**, **ios/**, **windows/**: Platform-specific directories.

## Installation

### Prerequisites

- **Node.js**: Ensure you have the latest stable version installed.
- **React Native CLI**: Install globally using:

  ```bash
  npm install -g react-native-cli
  ```

- **Platform-Specific Requirements**:
  - **Android**: Android Studio with necessary SDKs.
  - **iOS**: Xcode (macOS only) or use Expo for Windows.
  - **Windows**: Visual Studio with React Native Windows components.

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Peeyush-04/Japan-Crafts.git
   cd Japan-Crafts
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**

   - **Android**:

     ```bash
     npx react-native run-android
     ```

   - **iOS**:

     ```bash
     npx react-native run-ios
     ```

   - **Windows**:

     ```bash
     npx react-native run-windows
     ```

## Usage

Upon launching the app, users can browse through a list of traditional Japanese crafts. Selecting a craft provides detailed information, including its history and significance. Users can also mark crafts as favorites and use the search functionality to find specific crafts.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

We would like to thank all contributors and the open-source community for their invaluable support.

