import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from "../../assets/avatar5.png"
import axios from 'axios'

const detailPhoto = ({ route, navigation }) => {
    const { id, user, album } = route.params;
    const [data, setData] = useState([]);
    const [userProfile, setUserProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(res => {
                const photoData = res.data;
                setData(photoData)
                setIsLoading(false)
            })

        axios.get(`https://jsonplaceholder.typicode.com/users/${user}`)
            .then(res => {
                const userData = res.data;
                setUserProfile(userData)
            })
    }, [id, user])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {isLoading && <ActivityIndicator color={"#fff"} />}
            <View style={styles.containerPost}>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <Image source={avatar} style={styles.userProfile} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.teksJudul}>{userProfile.name} </Text>
                        <Text style={styles.teksJudulUsername}>@{userProfile.username}</Text>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: wp('90%') }}>
                <Image source={{ uri: data.url }} style={{ width: 300, height: 300, marginVertical: 20 }} />
                <Text style={styles.teksJudulPost}>{data.title}</Text>
                <Text style={styles.teksPost}>from {album}</Text>
            </View>
        </View>
    )
}

export default detailPhoto

const styles = StyleSheet.create({
    containerPost: {
        width: wp('100%'),
        paddingHorizontal: wp('7.5%'),
        paddingVertical: 5,
    },
    userProfile: {
        width: 50,
        height: 50,
    },
    teksJudul: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fafafa',
    },
    teksJudulUsername: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fafafa',
        opacity: 0.8,
        paddingBottom: 2
    },
    teksJudulPost: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fafafa',
        textTransform: 'capitalize',
        textAlign: 'center',
        marginBottom: 10
    },
    teksPost: {
        fontSize: 15,
        fontWeight: '100',
        color: '#fafafa',
        opacity: 0.8,
        textAlign: 'center'
    }
})
