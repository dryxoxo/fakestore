import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProductType } from '../../../utils/types/Product'
import { color } from '../../../themes/color';
import CardImage from '../../moleculs/Cart/CardImage';
import CardHeader from '../../moleculs/Cart/CardHeader';
import Counter from '../../moleculs/Cart/Counter';
import CardBottomAction from '../../moleculs/Cart/CardBottomAction';


interface CardProductProps {
    product: ProductType;
    onIncrement: (id: number) => void;
    onDecrement: (id: number) => void;
    onRemove: (id: number) => void;
}

const CardProduct: React.FC<CardProductProps> = ({ product, onDecrement, onIncrement, onRemove }) => {
    return (
        <View key={product.id} style={{ width: '100%', height: 'auto', backgroundColor: color.color.white, shadowColor: '#171717', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, borderRadius: 10 }}>
            <View style={{ width: '100%', height: 'auto', backgroundColor: color.color.white, borderRadius: 10, padding: 20, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: color.color.Black_05 }}>
                <CardImage uri={product.image} />
                <View style={{ gap: 10, marginLeft: 15, width: '75%', justifyContent: 'space-around', paddingRight: 10 }}>
                    <CardHeader
                        title={product.title}
                        price={product.price}
                    />
                    <Counter
                        quantity={product.quantity}
                        price={product.price}
                        onIncrement={() => onIncrement(product.id)}
                        onDecrement={() => onDecrement(product.id)}
                    />
                </View>
            </View>
            <CardBottomAction text={'Remove'} onPress={() => onRemove(product.id)} />
        </View>
    )
}

export default CardProduct

const styles = StyleSheet.create({})