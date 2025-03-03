import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Sucess } from '../../assets/svg'
import { color } from '../../themes/color'
import { typography } from '../../themes/typography'

interface ToastProps {
    type: 'success' | 'delete',
    title: string,
    description: string
}

const Toast: React.FC<ToastProps> = ({ type, title, description }) => {
    const toastStyles = {
        success: { bgColor: '#28a745', textColor: 'white' },
        delete: { bgColor: '#dc3545', textColor: 'white' },
        warning: { bgColor: '#ffc107', textColor: 'black' },
        info: { bgColor: '#17a2b8', textColor: 'white' },
    };

    const { bgColor, textColor } = toastStyles[type]

    return (
        <View style={{ width: '100%', position: 'absolute', zIndex: 1, paddingHorizontal: 10, marginTop: 10 }}>
            <View style={{ width: 'auto', backgroundColor: bgColor, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', gap: 10, paddingVertical: 10, borderWidth: 0.5, borderColor: '#48C1B5' }}>
                <Sucess width={25} height={25} style={{marginTop: 4}} />
                <View style={{ flex: 1, gap:5 }}>
                    <Text style={[styles.body01, { flexShrink: 1, color: textColor  }]}>{title}</Text>
                    <Text style={[styles.label, { flexShrink: 1, color: textColor }]}>{description}</Text>
                </View>
            </View>
        </View>
        // <View style={{ width: '100%', position: 'absolute', zIndex: 1, paddingHorizontal: 10, marginTop: 10 }}>
        //     <View style={{ width: 'auto', backgroundColor: '#D42525', paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row', gap: 10, paddingVertical: 10, borderWidth: 0.5, borderColor: '#48C1B5' }}>
        //         <Sucess width={25} height={25} style={{ marginTop: 4 }} />
        //         <View style={{ flex: 1, gap: 5 }}>
        //             <Text style={[styles.body01, { flexShrink: 1, color: color.color.white }]}>Success! Deleted From Cart</Text>
        //             <Text style={[styles.label, { flexShrink: 1, color: color.color.Black_06 }]}>The item has been successfully deleted from your cart.</Text>
        //         </View>
        //     </View>
        // </View>
    )
}

export default Toast

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Bold,
    heading04: typography.Heading04.Regular,
    body02: typography.Body02.SemiBold,
    body01: typography.Body.Medium,
    label: typography.Label.Regular
})