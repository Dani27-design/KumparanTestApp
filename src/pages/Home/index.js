import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from "../../assets/avatar5.png"
import axios from 'axios'

const index = ({ navigation }) => {
    const [post, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/posts/`)
            .then(res => {
                const postData = res.data;
                setPost(postData)
                setIsLoading(false)
            })
    }, [])

    const PostList = ({ post, navigation, navigationUser }) => {
        const [user, setUser] = useState([]);
        const [userCompany, setUserCompany] = useState([]);

        useEffect(() => {
            axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                .then(res => {
                    const userData = res.data;
                    const userDataCompany = res.data.company;
                    setUser(userData)
                    setUserCompany(userDataCompany)
                })
        }, [post.userId])

        return (
            <TouchableOpacity onPress={navigation}>
                <View style={styles.containerPost}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', paddingVertical: 5 }}
                        onPress={navigationUser}>
                        <Image source={avatar} style={styles.userProfile} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: wp('70%'), flexWrap: 'wrap' }}>
                                <Text style={styles.teksJudul}>{user.name} </Text>
                                <Text style={styles.teksJudulUsername}>@{user.username}</Text>
                            </View>
                            <Text style={styles.teks}>{userCompany.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
                        <Text style={styles.teksJudulPost}>" {post.title} "</Text>
                        <Text style={styles.teksPost}>{post.body} . . .</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {isLoading && <ActivityIndicator color={"#fff"} />}
                {post.length > 0 &&
                    post.map((post) => {
                        return (
                            <PostList
                                key={post.id}
                                post={post}
                                navigation={() =>
                                    navigation.navigate('detailPost', {
                                        id: post.id,
                                    })
                                }
                                navigationUser={() =>
                                    navigation.navigate('detailUser', {
                                        id: post.userId,
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
        paddingVertical: 5,
        marginHorizontal: 20
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
        textTransform: 'capitalize'
    },
    teksPost: {
        fontSize: 13,
        fontWeight: '100',
        color: '#fafafa',
        opacity: 0.8
    }
})
