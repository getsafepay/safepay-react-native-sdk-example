import {
    CardCapture,
    CardCaptureError,
    CardCaptureMethods,
    CardCaptureProceedToAuthenticationData,
    CardFieldDetails,
    ENVIRONMENT,
    SafepayContext,
    SafepayContextType,
    SafepayPayerAuthentication,
} from "@sfpy/react-native";
import { useCallback, useContext, useRef, useState } from "react";
import {
    Button,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type EditableField = Exclude<keyof SafepayContextType, "setValues">;

type Outcome = {
    label: string;
    payload?: unknown;
};

const ENVIRONMENTS = [ENVIRONMENT.DEVELOPMENT, ENVIRONMENT.SANDBOX, ENVIRONMENT.PRODUCTION];

export default function Index() {
    const { setValues, ...values } = useContext(SafepayContext);
    const [environment, setEnvironment] = useState(ENVIRONMENT.SANDBOX);
    const cardCaptureRef = useRef<CardCaptureMethods | null>(null);
    const [card, setCard] = useState<CardFieldDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [authSetup, setAuthSetup] = useState<CardCaptureProceedToAuthenticationData | null>(null);
    const [outcome, setOutcome] = useState<Outcome | null>(null);
    const [showAuth, setShowAuth] = useState(false);

    const update = useCallback((field: EditableField, value: string) => {
        setValues?.({ ...values, [field]: value });
    }, [setValues, values]);

    const handlePay = useCallback(async () => {
        if (!values.clientSecret || !values.tracker) {
            setError("Enter a client secret and tracker first.");
            return;
        }
        const isValid = await cardCaptureRef.current?.fetchValidity();
        if (!isValid) {
            setError("Card details are incomplete.");
            return;
        }
        setError(null);
        setAuthSetup(null);
        setOutcome(null);
        cardCaptureRef.current?.submit();
    }, [values.clientSecret, values.tracker]);

    const handleCardCaptureError = useCallback((captureError: CardCaptureError) => {
        setError(captureError.code ? `${captureError.code}: ${captureError.message}` : captureError.message);
    }, []);

    const handleProceedToAuthentication = useCallback((data: CardCaptureProceedToAuthenticationData) => {
        setAuthSetup(data);
        setValues?.({
            ...values,
            deviceDataCollectionJWT: data.accessToken,
            deviceDataCollectionURL: data.deviceDataCollectionURL,
        });
        setShowAuth(true);
    }, [setValues, values]);

    const finishAuthentication = useCallback((label: string, payload?: unknown) => {
        console.log(label, payload);
        setOutcome({ label, payload });
        setShowAuth(false);
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Section title="Session">
                    <Field label="Client secret (TBT)" value={values.clientSecret} onChangeText={v => update("clientSecret", v)} />
                    <Field label="Tracker" value={values.tracker} onChangeText={v => update("tracker", v)} placeholder="track_…" />
                    <View style={{ gap: 4 }}>
                        <Text style={styles.label}>Environment</Text>
                        <View style={styles.segments}>
                            {ENVIRONMENTS.map(env => (
                                <Pressable
                                    key={env}
                                    onPress={() => setEnvironment(env)}
                                    style={[styles.segment, env === environment && styles.segmentSelected]}
                                >
                                    <Text style={env === environment ? styles.segmentSelectedText : undefined}>
                                        {env.charAt(0) + env.slice(1).toLowerCase()}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <Text style={styles.hint}>Must match the environment the client secret and tracker were created in.</Text>
                    </View>
                </Section>

                <Section title="Billing address">
                    <Field label="Street 1" value={values.street_1} onChangeText={v => update("street_1", v)} />
                    <Field label="Street 2" value={values.street_2} onChangeText={v => update("street_2", v)} />
                    <Field label="City" value={values.city} onChangeText={v => update("city", v)} />
                    <Field label="State" value={values.state} onChangeText={v => update("state", v)} />
                    <Field label="Postal code" value={values.postal_code} onChangeText={v => update("postal_code", v)} />
                    <Field label="Country" value={values.country} onChangeText={v => update("country", v)} placeholder="PK" />
                </Section>

                <Section title="Card">
                    <CardCapture
                        imperativeRef={cardCaptureRef}
                        environment={environment}
                        authToken={values.clientSecret}
                        tracker={values.tracker}
                        onCardChange={details => {
                            setCard(details);
                            setError(null);
                        }}
                        onError={handleCardCaptureError}
                        onProceedToAuthentication={handleProceedToAuthentication}
                        style={{ height: 120 }}
                    />
                    <Text style={styles.hint}>
                        {card
                            ? `${card.brand ?? "Unknown brand"} · number ${card.validNumber} · expiry ${card.validExpiryDate} · CVC ${card.validCVC}`
                            : "Card number, expiry and CVC are captured natively."}
                    </Text>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <Button title="Pay" onPress={() => { void handlePay(); }} />
                </Section>

                <Section title="Result">
                    <Text>Card capture: {authSetup ? `payment method ${authSetup.paymentMethod.token} (•••• ${authSetup.paymentMethod.lastFour})` : "-"}</Text>
                    <Text>Payer authentication: {outcome?.label ?? "-"}</Text>
                    {outcome?.payload !== undefined ? (
                        <Text style={styles.payload}>{JSON.stringify(outcome.payload, null, 2)}</Text>
                    ) : null}
                </Section>
            </ScrollView>

            <Modal
                visible={showAuth}
                transparent
                animationType="fade"
                onRequestClose={() => setShowAuth(false)}
            >
                <View style={styles.overlay}>
                    <Pressable style={styles.backdrop} onPress={() => setShowAuth(false)} />
                    <View style={styles.authContainer}>
                        <SafepayPayerAuthentication
                            environment={environment}
                            doCaptureOnAuthorization
                            doCardOnFile
                            onPayerAuthenticationRequired={data => console.log("onPayerAuthenticationRequired", data)}
                            onPayerAuthenticationFrictionless={data => finishAuthentication("Frictionless", data)}
                            onPayerAuthenticationSuccess={data => finishAuthentication("Success", data)}
                            onPayerAuthenticationFailure={data => finishAuthentication("Failure", data)}
                            onPayerAuthenticationUnavailable={data => finishAuthentication("Unavailable", data)}
                            onSafepayError={data => finishAuthentication("Safepay error", data)}
                        />
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
}

function Field({ label, value, onChangeText, placeholder }: {
    label: string;
    value?: string | null;
    onChangeText: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <View style={{ gap: 4 }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value ?? ""}
                onChangeText={onChangeText}
                placeholder={placeholder ?? label}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 24,
    },
    section: {
        gap: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    label: {
        color: "#344054",
    },
    input: {
        borderWidth: 1,
        borderColor: "#d0d5dd",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "white",
    },
    hint: {
        color: "#475467",
    },
    segments: {
        flexDirection: "row",
        gap: 8,
    },
    segment: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#d0d5dd",
        borderRadius: 8,
        backgroundColor: "white",
    },
    segmentSelected: {
        borderColor: "#1f6feb",
        backgroundColor: "#1f6feb",
    },
    segmentSelectedText: {
        color: "white",
        fontWeight: "600",
    },
    error: {
        color: "#b42318",
    },
    payload: {
        fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
        fontSize: 12,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    authContainer: {
        width: "90%",
        height: "80%",
        backgroundColor: "white",
        borderRadius: 12,
        overflow: "hidden",
    },
});
