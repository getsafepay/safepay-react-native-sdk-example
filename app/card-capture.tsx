import { CardField, CardFieldDetails, CardFieldMethods } from "@sfpy/react-native";
import { useCallback, useRef, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function CardCaptureDemo() {
    const cardRef = useRef<CardFieldMethods>(null);
    const [card, setCard] = useState<CardFieldDetails | null>(null);

    const onCardChange = useCallback((details: CardFieldDetails) => {
        setCard(details);
    }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Card Capture (Embedded)
            </Text>

            <CardField
                ref={cardRef}
                onCardChange={onCardChange}
                style={{ height: 120 }}
            />

            <View style={{ gap: 8 }}>
                <Button title="Focus" onPress={() => cardRef.current?.focus()} />
                <Button title="Clear" onPress={() => cardRef.current?.clear()} />
            </View>

            <View style={{ gap: 6 }}>
                <Text>Complete: {card?.complete ? "yes" : "no"}</Text>
                <Text>Brand: {card?.brand ?? "-"}</Text>
                <Text>Last4: {card?.last4 ?? "-"}</Text>
                <Text>
                    Expiry: {card?.expiryMonth ?? "-"} / {card?.expiryYear ?? "-"}
                </Text>
                <Text>Valid Number: {card?.validNumber ?? "-"}</Text>
                <Text>Valid Expiry: {card?.validExpiryDate ?? "-"}</Text>
                <Text>Valid CVC: {card?.validCVC ?? "-"}</Text>
            </View>
        </ScrollView>
    );
}
