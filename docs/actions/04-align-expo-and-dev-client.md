# 04 Align Expo and Dev Client

Status: implemented.

## What changed
Aligned the example app with the Expo 52 package versions expected by the installed SDK.

Updated:
- `@expo/vector-icons` to `~14.0.4`
- `expo-font` to `~13.0.4`
- `react-native` to `0.76.9`
- `react-native-webview` to `13.12.5`
- `expo-router` to `~4.0.22`
- `expo-splash-screen` to `~0.29.24`
- `expo-system-ui` to `~4.0.9`

Also updated:
- `app.json` to keep `newArchEnabled` set to `false`
- `package.json` scripts so the example uses the dev client instead of Expo Go

## Why this was necessary
The native card capture views are implemented as legacy native view managers today. Expo Go does not include them, and New Architecture / bridgeless builds still need a dedicated Fabric pass that has not been implemented yet.

The example therefore needs to:
- run as a dev-client app
- keep New Architecture disabled
- stay on the Expo-managed package versions that match Expo 52

For Android specifically, using `expo start --android` also proved unreliable when stale offline emulators were present in adb, so the example now separates "build/install" from "start Metro".
