import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import logo from "../../assets/logo-kumparan.png"

const index = ({ navigation }) => {
    const [persons, setPersons] = useState([])
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('App');
        }, 3000)
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={logo} style={{ width: 150, height: 150 }} />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
