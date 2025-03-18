import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

type FormValues = {
    clientSecret: string;
    tracker: string;
    deviceDataCollectionJWT: string;
    deviceDataCollectionURL: string;
    street_1?: string | null;
    street_2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
};

const schema = Yup.object().shape({
    clientSecret: Yup.string().required("Client Secret is required"),
    tracker: Yup.string().required("Tracker is required"),
    deviceDataCollectionJWT: Yup.string().required("JWT is required"),
    deviceDataCollectionURL: Yup.string()
        .url("Must be a valid URL")
        .required("Device Data Collection URL is required"),
    street_1: Yup.string().notRequired(),
    street_2: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    state: Yup.string().notRequired(),
    postal_code: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
});

export default function Form({ initialData, setValues }: { initialData: FormValues, setValues: (formValues: FormValues) => void }) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            clientSecret: "",
            tracker: "",
            deviceDataCollectionJWT: "",
            deviceDataCollectionURL: "",
            street_1: "",
            street_2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
        },
    });

    React.useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData]);

    const onSubmit = (data: FormValues) => {
        setValues(data);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Payment Details</Text>

            <Controller
                control={control}
                name="clientSecret"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Client Secret:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Client Secret"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="tracker"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Tracker:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Tracker"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="deviceDataCollectionJWT"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Device Data Collection JWT:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Device Data Collection JWT"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="deviceDataCollectionURL"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Device Data Collection URL:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Device Data Collection URL"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="street_1"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Street 1:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ""}
                            placeholder="Street 1"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="street_2"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Street 2:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ""}
                            placeholder="Street 2"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>City:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ""}
                            placeholder="City"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="state"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>State:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ""}
                            placeholder="State"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="postal_code"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Postal Code:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ""}
                            placeholder="Postal Code"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="country"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <Text>Country:</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value || ""}
                            placeholder="Country"
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                )}
            />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginVertical: 10,
        borderRadius: 4,
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
});