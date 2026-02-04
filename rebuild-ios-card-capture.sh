#!/usr/bin/env zsh
set -euo pipefail

SDK_DIR="/Users/thomas/Code/sfpy-react-native"
EXAMPLE_DIR="/Users/thomas/Code/safepay-react-native-sdk-example"
SIM_ID="C3508D39-287E-4F17-869C-D3E0E62E8134"
DERIVED="/tmp/sfpy-example-dd"
export NPM_CONFIG_CACHE="/tmp/npm-cache"

cd "$SDK_DIR"
npm run build
TARBALL="$(npm pack --cache "$NPM_CONFIG_CACHE" | tail -n 1)"
cp "$SDK_DIR/$TARBALL" "$EXAMPLE_DIR/"

cd "$EXAMPLE_DIR"
if [[ -f "$TARBALL" ]]; then
  npm pkg set "dependencies.@sfpy/react-native=file:$TARBALL" >/dev/null
fi
rm -rf node_modules/@sfpy/react-native
npm install --no-fund --no-audit
( cd ios && pod install )

xcrun simctl bootstatus "$SIM_ID" -b
xcodebuild -workspace ios/safepayreactnativesdkexample.xcworkspace \
  -scheme safepayreactnativesdkexample \
  -configuration Debug \
  -destination "platform=iOS Simulator,id=$SIM_ID" \
  -derivedDataPath "$DERIVED"

APP="$DERIVED/Build/Products/Debug-iphonesimulator/safepayreactnativesdkexample.app"
xcrun simctl install "$SIM_ID" "$APP"
xcrun simctl launch "$SIM_ID" com.tsmith93.safepayreactnativesdkexample
