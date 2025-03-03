import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../../themes/color';
import { typography } from '../../themes/typography';

interface ButtonProps {
    text: string;
    textColor?: string;
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
    onPress: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onPress,
    backgroundColor = color.systemColor.darkBlue,
    textColor = color.color.white,
    textAlign = "center",
    isLoading,
    isDisabled
}) => {
    return (
        <TouchableOpacity disabled={isLoading||isDisabled} style={[styles.button, { backgroundColor: isDisabled? 'grey':backgroundColor }]} onPress={onPress}>
            {isLoading ? (
                <ActivityIndicator style={{flex:1}} />
            ) : (
                <Text style={[styles.buttonText, { color: textColor, textAlign, marginVertical: 'auto' }]}>{text}</Text>
            )
            }

        </TouchableOpacity>
    )
}

export default Button


const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 56,
        borderRadius: 10,
        paddingHorizontal: 20
    },
    buttonText: typography.Body02.SemiBold,
})