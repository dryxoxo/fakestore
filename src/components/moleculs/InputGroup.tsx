import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from '../atoms/Label'
import Input from '../atoms/Input'


interface InputGroupProps {
    label: string,
    placeHolder?: string,
    secure?: boolean
    onChangeText: (text: string) => void,
    isSuccess?: boolean
}
const InputGroup: React.FC<InputGroupProps> = ({label, placeHolder, secure, onChangeText, isSuccess}) => {
  return (
    <View style={{width: '100%'}}>
        <Label text={label} />
        <Input placeHolder={placeHolder} secure={secure} onChange={onChangeText} isSuccess={isSuccess}/>
    </View>
  )
}

export default InputGroup

const styles = StyleSheet.create({})