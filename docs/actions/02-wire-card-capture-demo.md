# 02 Wire Card Capture Demo

Status: implemented.

## What changed
The example is a single screen (`app/index.tsx`) that runs the whole card capture + payer auth flow:

1. **Session** – plain inputs for the client secret (time-based token) and tracker, plus an environment switch. Nothing is pre-filled; mint both in the environment you select.
2. **Billing address** – optional address fields passed to payer authentication.
3. **Card** – the native-backed `CardCapture` component and a single **Pay** button. Pay checks `fetchValidity()`, then `submit()` runs `PAYER_AUTH_SETUP` natively.
4. **Result** – the payment method returned by card capture and the payer-authentication outcome.

`onProceedToAuthentication` stores the returned `accessToken` / `deviceDataCollectionURL` in `SafepayContext` and opens `SafepayPayerAuthentication` in a modal for device data collection and 3DS.

## Removed
- The standalone payer-auth screen and the separate card-capture screen
- The react-hook-form `Form` component (and the `react-hook-form`, `yup`, `@hookform/resolvers` dependencies)
- Hard-coded client secret / tracker values
