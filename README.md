# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

Demo Description

....................................................

App Overview
This is a React Native application built with Expo and TypeScript. It functions as a secure product catalog browser featuring user authentication, real-time data fetching, and a responsive UI that adapts to different device sizes.

Core Functionality
1. Authentication System (
AuthContext
)

Login Integration: Authenticates users against the https://reqres.in/api/login API.
Session Persistence: Stores user tokens locally using AsyncStorage, allowing users to stay logged in even after closing the app.
Protected Routes: Automatically redirects unauthenticated users to the Login screen and authenticated users to the Main App.
Offline/Demo Mode: Contains a fallback mechanism to allow login with specific credentials (eve.holt@reqres.in) even if the network fails.
2. Product Browser (
ApiContext
)

Data Fetching: Consumes the https://dummyjson.com/products API to display a list of products.
Pagination (Infinite Scroll): Automatically loads more products as the user scrolls to the bottom of the list.
Pull-to-Refresh: Users can pull down on the list to reload the data from the start.
Client-Side Search: A search bar allows users to filter the loaded products by Title or Category instantly.
3. User Interface & Experience

Responsive Layout: The product grid dynamically adjusts its column count based on the screen width (3 columns for phones, 6 columns for tablets/desktops).
Theming: Built-in support for Light and Dark modes via ThemeContext.
Feedback: Uses react-native-toast-message to display non-intrusive success and error notifications (e.g., "Login Successful").
Key File Structure
app/_layout.tsx
: The root entry point that wraps the entire application with necessary providers (
Auth
, Theme, 
Api
) and handles global navigation logic.
app/(app)/index.tsx
: The main dashboard screen containing the search bar, product grid, and loading states.
contexts/: Contains the logic for state management (
AuthContext
, 
ApiContext
, ThemeContext), keeping business logic separate from UI components.



....................................................