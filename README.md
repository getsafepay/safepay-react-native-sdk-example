# Safepay React Native SDK Example

This app exercises `@sfpy/react-native`, including the native card capture field. It is an Expo **development build** app (Expo Go will not work).

## Prereqs

- Node + npm
- Xcode + CocoaPods (iOS)
- Android SDK + an emulator
- Sibling repos expected by native modules:
  - `../safepay-ios-sdk-getsafepay` (used by `ios/Podfile`)
  - `../safepay-android-sdk-getsafepay` (used by `android/settings.gradle`)

If your folder names differ, update:
- `ios/Podfile` for the iOS SDK path
- `android/settings.gradle` for the Android SDK path

## Install

```bash
npm install
```

Convenience scripts:

```bash
npm run ios
npm run android
```

Both start Metro in dev-client mode. `npm run ios` also opens the simulator. `npm run android` does not auto-open an emulator because Expo CLI's Android device resolution is brittle when stale offline emulators are present.

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
   npm run ios
   ```

## Android (dev client)

The example uses the Android SDK's `safePayCard` module, which doesn't depend on the Cardinal Mobile SDK, so no Cardinal credentials are needed.

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
npm run android
```

Then launch the installed app on the emulator.

## Common issues

- **Black screen / “Unable to load script”**: Metro is not running or the app can’t reach it. Start Metro with `npx expo start --dev-client` and relaunch the app.
- **Android install hangs**: Restart adb and the emulator, then re-run `./gradlew installDebug`.
- **Expo Go / `bubblingEventTypes of null`**: this app uses custom native views. Use the dev client only; Expo Go will not work.
