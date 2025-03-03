import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Input from '../atoms/Input'
import { typography } from '../../themes/typography'
import { color } from '../../themes/color'

const SearchPage = () => {
    const windowWidth = Dimensions.get('window').width;
    return (
        <SafeAreaView style={{backgroundColor: color.color.Black_06, width: '100%', flex:1}}>
            <View style={{ paddingHorizontal: 10, width: '100%' }}>
                <Input placeHolder='Search Products' onChange={()=>{}} />
            </View>
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, paddingHorizontal: 10, paddingTop: 10, marginBottom: 50 }}>
                    <View style={{ height: 250, backgroundColor: color.color.Black_06, borderRadius: 12, width: (windowWidth - (30 + 12)) / 2 }}>
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <Image source={{ uri: 'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg' }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'relative', backgroundColor: color.systemColor.darkBlue, top: -16, left: 130, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 5, gap: 2 }}>
                            <Text style={styles.heading04}>Test Judul</Text>
                            <Text style={styles.body02}>$28.1</Text>
                            <Text style={styles.label}>⭐️ 3.81</Text>
                        </View>
                    </View>
                    <View style={{ height: 250, backgroundColor: color.color.Black_06, borderRadius: 12, width: (windowWidth - (30 + 12)) / 2 }}>
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <Image source={{ uri: 'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg' }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'relative', backgroundColor: color.systemColor.darkBlue, top: -16, left: 130, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 5, gap: 2 }}>
                            <Text style={styles.heading04}>Test Judul</Text>
                            <Text style={styles.body02}>$28.1</Text>
                            <Text style={styles.label}>⭐️ 3.81</Text>
                        </View>
                    </View>
                    <View style={{ height: 250, backgroundColor: color.color.Black_06, borderRadius: 12, width: (windowWidth - (30 + 12)) / 2 }}>
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <Image source={{ uri: 'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg' }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'relative', backgroundColor: color.systemColor.darkBlue, top: -16, left: 130, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 5, gap: 2 }}>
                            <Text style={styles.heading04}>Test Judul</Text>
                            <Text style={styles.body02}>$28.1</Text>
                            <Text style={styles.label}>⭐️ 3.81</Text>
                        </View>
                    </View>
                    <View style={{ height: 250, backgroundColor: color.color.Black_06, borderRadius: 12, width: (windowWidth - (30 + 12)) / 2 }}>
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <Image source={{ uri: 'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg' }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'relative', backgroundColor: color.systemColor.darkBlue, top: -16, left: 130, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 5, gap: 2 }}>
                            <Text style={styles.heading04}>Test Judul</Text>
                            <Text style={styles.body02}>$28.1</Text>
                            <Text style={styles.label}>⭐️ 3.81</Text>
                        </View>
                    </View>
                    <View style={{ height: 250, backgroundColor: color.color.Black_06, borderRadius: 12, width: (windowWidth - (30 + 12)) / 2 }}>
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <Image source={{ uri: 'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg' }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'relative', backgroundColor: color.systemColor.darkBlue, top: -16, left: 130, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 5, gap: 2 }}>
                            <Text style={styles.heading04}>Test Judul</Text>
                            <Text style={styles.body02}>$28.1</Text>
                            <Text style={styles.label}>⭐️ 3.81</Text>
                        </View>
                    </View>
                    <View style={{ height: 250, backgroundColor: color.color.Black_06, borderRadius: 12, width: (windowWidth - (30 + 12)) / 2 }}>
                        <View style={{ width: '100%', aspectRatio: 1 }}>
                            <Image source={{ uri: 'https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg' }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />
                            <TouchableOpacity style={{ width: 30, height: 30, position: 'relative', backgroundColor: color.systemColor.darkBlue, top: -16, left: 130, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[{ fontSize: 14, color: color.color.Black_06 }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 5, gap: 2 }}>
                            <Text style={styles.heading04}>Test Judul</Text>
                            <Text style={styles.body02}>$28.1</Text>
                            <Text style={styles.label}>⭐️ 3.81</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    heading02: typography.Heading02.Medium,
    heading03: typography.Heading03.Bold,
    heading03Medium: typography.Heading03.Medium,
    heading04: typography.Heading04.Regular,
    body02: typography.Body02.SemiBold,
    body01Regular: typography.Body.Regular,
    label: typography.Label.Regular
})