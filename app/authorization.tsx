import { ENVIRONMENT, SafepayPayerAuthentication } from "@sfpy/react-native";


export default function SafepayPayerAuthenticationModal() {

    return (
        <SafepayPayerAuthentication
            environment={ENVIRONMENT.SANDBOX}
            onCardinalSuccess={data => console.log("onCardinalSuccess", data)}
            onCardinalError={data => console.log("onCardinalError", data)}
            onPayerAuthEnrollmentRequired={() => console.log("onPayerAuthEnrollmentRequired")}
            onPayerAuthEnrollmentFrictionless={data => console.log("onPayerAuthEnrollmentFrictionless", data)}
            onPayerAuthEnrollmentFailure={data => console.log("onPayerAuthEnrollmentFailure", data)}
            onSafepayError={data => console.log("onSafepayError", data)}
        />
    );
};
