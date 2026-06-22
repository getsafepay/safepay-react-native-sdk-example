import { ENVIRONMENT, SafepayPayerAuthentication } from "@sfpy/react-native";

export default function SafepayPayerAuthenticationModal() {
    return (
        <SafepayPayerAuthentication
            environment={ENVIRONMENT.DEVELOPMENT}
            onPayerAuthenticationRequired={() => console.log("onPayerAuthenticationRequired")}
            onPayerAuthenticationFrictionless={data => console.log("onPayerAuthenticationFrictionless", data)}
            onPayerAuthenticationSuccess={data => console.log("onPayerAuthenticationSuccess", data)}
            onPayerAuthenticationFailure={data => console.log("onPayerAuthenticationFailure", data)}
            onPayerAuthenticationUnavailable={data => console.log("onPayerAuthenticationUnavailable", data.errorMessage)}
            onSafepayError={data => console.log("onSafepayError", data)}
        />
    );
}
