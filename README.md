# Safepay React Native SDK Example

This app exercises `@sfpy/react-native`, including the native card capture field. It is an Expo **development build** app (Expo Go will not work).

## Prereqs

- Node + npm
- Xcode + CocoaPods (iOS)
- Android SDK + an emulator
- Sibling repos expected by native modules:
  - `../safepay-ios-sdk` (used by `ios/Podfile`)
  - `../safepay-android-sdk-getsafepay` (used by `android/settings.gradle`)

If your folder names differ, update:
- `ios/Podfile` for the iOS SDK path
- `android/settings.gradle` for the Android SDK path

## Install

```bash
npm install
```

## iOS (dev client)

1. Install pods:
   ```bash
   cd ios
   pod install
   ```

2. Build the dev client:
   ```bash
   cd ..
   npx expo run:ios
   ```

3. Start Metro and open the app:
   ```bash
   npx expo start --dev-client
   ```
   Then press `i` to open the iOS simulator.

## Android (dev client)

The Android build fetches Cardinal Commerce artifacts. Export credentials before building:

```bash
export CARDINAL_USERNAME="your-username"
export CARDINAL_PASSWORD="your-password"
```

Build and install:

```bash
npx expo run:android
```

Or, if you already built once and just need to reinstall:

```bash
cd android
./gradlew installDebug
```

Then start Metro:

```bash
cd ..
npx expo start --dev-client
```

## Common issues

- **Black screen / “Unable to load script”**: Metro is not running or the app can’t reach it. Start Metro with `npx expo start --dev-client` and relaunch the app.
- **Android install hangs**: Restart adb and the emulator, then re-run `./gradlew installDebug`.
