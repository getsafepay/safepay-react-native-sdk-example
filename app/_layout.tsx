import { SafepayContext, SafepayContextTypeWithoutSetter } from "@sfpy/react-native";
import { Stack, useRouter } from "expo-router";
import * as React from "react";

export default function RootLayout() {

    const [values, setValues] = React.useState<SafepayContextTypeWithoutSetter>({
        clientSecret: "",
        tracker: "",
        deviceDataCollectionJWT: "",
        deviceDataCollectionURL: "https://centinelapistag.cardinalcommerce.com/V1/Cruise/Collect",
        street_1: "St 12",
        street_2: "",
        city: "Islamabad",
        state: "",
        postal_code: "44000",
        country: "PK"
    });

    const router = useRouter();

    React.useEffect(() => {
        if (!values.clientSecret || !values.tracker || !values.deviceDataCollectionJWT || !values.deviceDataCollectionURL || !values.street_1 || !values.city || !values.postal_code || !values.country) {
            return;
        }
        router.replace("/authorization");
    }, [values]);

    return (
        <SafepayContext.Provider value={{...values, setValues}}>
            <Stack>
                <Stack.Screen
                    name="index"
                />
                <Stack.Screen
                    name="authorization"
                    options={{
                        presentation: "modal",
                        animation: "slide_from_bottom"
                    }}
                />
            </Stack>
        </SafepayContext.Provider>
    );
};
