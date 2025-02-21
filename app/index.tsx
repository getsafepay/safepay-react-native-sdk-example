import Form from "@/components/Form";
import { SafepayContext } from "@sfpy/react-native";
import { useContext } from "react";
import { View } from "react-native";


export default function Index() {

    const safepayContext = useContext(SafepayContext);
    
    return (
        <View
            style={{
                flex: 1
            }}
        >
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
                setValues={safepayContext.setValues}
            />
        </View>
    );
}
