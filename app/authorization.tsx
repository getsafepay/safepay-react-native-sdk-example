import { ENVIRONMENT, SafepayPayerAuthentication } from "@sfpy/react-native";


export default function SafepayPayerAuthenticationModal() {

    return (
            <SafepayPayerAuthentication
                environment={ENVIRONMENT.DEVELOPMENT}
            />
    );
};
