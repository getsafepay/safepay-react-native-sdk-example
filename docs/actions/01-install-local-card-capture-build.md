# 01 Install Local Card Capture Build

Status: implemented.

## What changed
Installed the latest local packed build of `@sfpy/react-native@0.2.0` into the example app using the tarball dependency already referenced in `package.json`.

The example now resolves `@sfpy/react-native` from:
- `file:./sfpy-react-native-0.2.0.tgz`

## Why this was necessary
`0.2.0` is not published yet, so the example could not cleanly install from the registry. Keeping the tarball dependency let the example track the current local SDK branch without inventing a fake version.
