# 03 iOS Local SDK Path

Status: implemented for local validation.

## What changed
The generated `ios/Podfile` used by the Expo dev build was updated to point `SafepayiOSSDK` at:
- `../../safepay-ios-sdk-getsafepay`

This matched the Android side, which already referenced the getsafepay clone directly.

## Why this was necessary
The old generated pod path still pointed at the pre-transfer checkout (`../../safepay-ios-sdk`), which did not contain the new `SafepayCardCaptureController` work. That caused the RN iOS bridge to compile against a stale SDK and fail to resolve the new card-capture types.

## Important note
`ios/` is ignored in this Expo app, so this path change is a local generated-file adjustment rather than a tracked source file in the example repo. The tracked README now documents the correct sibling SDK folder name.
