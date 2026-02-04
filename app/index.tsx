import Form from "@/components/Form";
import { SafepayContext, SafepayContextType } from "@sfpy/react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";


export default function Index() {

    const safepayContext = useContext(SafepayContext);
    
    return (
        <View
            style={{
                flex: 1,
                padding: 16,
                gap: 16
            }}
        >
            <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>Demos</Text>
                <Link href="/authorization" asChild>
                    <Pressable style={{ paddingVertical: 10 }}>
                        <Text style={{ color: "#1f6feb" }}>Payer Authentication Demo</Text>
                    </Pressable>
                </Link>
                <Link href="/card-capture" asChild>
                    <Pressable style={{ paddingVertical: 10 }}>
                        <Text style={{ color: "#1f6feb" }}>Card Capture Demo</Text>
                    </Pressable>
                </Link>
            </View>
            <Form
                initialData={{
                    clientSecret: safepayContext.clientSecret,
                    tracker: safepayContext.tracker,
                    deviceDataCollectionJWT: safepayContext.deviceDataCollectionJWT,
                    deviceDataCollectionURL: safepayContext.deviceDataCollectionURL,
                    street_1: safepayContext.street_1,
                    street_2: safepayContext.street_2,
                    city: safepayContext.city,
                    state: safepayContext.state,
                    postal_code: safepayContext.postal_code,
                    country: safepayContext.country
                }}
                setValues={values => safepayContext.setValues && safepayContext.setValues(values as SafepayContextType)}
            />
        </View>
    );
}
