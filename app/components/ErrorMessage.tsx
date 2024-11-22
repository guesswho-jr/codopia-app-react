import React from 'react';
import { Text } from 'react-native';


interface props {
    field: string
    touched: boolean | undefined
    errors: {
        [key: string]: string
    }
}
export default function ErrorMessage({ field, touched, errors }: props) {
    return (
        <Text style={{ color: "red" }}>
            {touched && errors[field]}
        </Text>
    );
};
