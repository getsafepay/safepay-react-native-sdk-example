import { SafepayContext, SafepayContextType } from "@sfpy/react-native";
import { Stack } from "expo-router";
import * as React from "react";

export default function RootLayout() {

    const [values, setValues] = React.useState<SafepayContextType>({
        clientSecret: "",
        tracker: "",
        deviceDataCollectionJWT: "",
        deviceDataCollectionURL: "",
        street_1: "St 12",
        street_2: "",
        city: "Islamabad",
        state: "",
        postal_code: "44000",
        country: "PK"
    });

    return (
        <SafepayContext.Provider value={{ ...values, setValues }}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Safepay Card Capture"
                    }}
                />
            </Stack>
        </SafepayContext.Provider>
    );
};
