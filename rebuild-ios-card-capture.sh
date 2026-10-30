#!/usr/bin/env zsh
set -euo pipefail

EXAMPLE_DIR="/Users/thomas/Code/safepay-react-native-sdk-example"
SIM_ID="C3508D39-287E-4F17-869C-D3E0E62E8134"
DERIVED="/tmp/sfpy-example-dd"
cd "$EXAMPLE_DIR"
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
