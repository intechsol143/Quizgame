import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const Star = ({ size, top, left, opacity }) => {
    return (
        <View
            style={{
                position: 'absolute',
                width: size,
                height: size,
                backgroundColor: 'white',
                borderRadius: size / 2,
                top,
                left,
                opacity,
            }}
        />
    );
};
export default Star

const styles = StyleSheet.create({})