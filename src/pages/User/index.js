import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from "../../assets/avatar5.png"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

const index = ({ navigation }) => {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/users/`)
            .then(res => {
                const userData = res.data;
                setUser(userData)
                setIsLoading(false)
            })
    }, [])

    const UserList = ({ user, navigationUser }) => {

        return (
            <TouchableOpacity
                style={styles.containerPost}
                onPress={navigationUser}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={avatar} style={styles.userProfile} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: wp('65%'), flexWrap: 'wrap' }}>
                            <Text style={styles.teksJudul}>{user.name} </Text>
                            <Text style={styles.teksJudulUsername}>@{user.username}</Text>
                        </View>
                        <Text style={styles.teks}>{user.company.name}</Text>
                    </View>
                </View>
                <View>
                    <FontAwesome5
                        name="info-circle"
                        size={23}
                        color="#fafafa"
                        style=
                        {{
                            alignSelf: 'flex-end',
                        }} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {isLoading && <ActivityIndicator color={"#fff"} />}
                {user.length > 0 &&
                    user.map((user) => {
                        return (
                            <UserList
                                key={user.id}
                                user={user}
                                navigationUser={() =>
                                    navigation.navigate('detailUser', {
                                        id: user.id,
                                    })}
                            />
                        );
                    })}
            </View >
        </ScrollView>
    )
}

export default index

const styles = StyleSheet.create({
    containerPost: {
        width: wp('100%'),
        backgroundColor: '#131313',
        borderBottomWidth: 0.19,
        borderBottomColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
    teks: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fafafa'
    },
    teksJudulPost: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fafafa',
    },
    teksPost: {
        fontSize: 13,
        fontWeight: '100',
        color: '#fafafa',
        opacity: 0.8
    }
})
