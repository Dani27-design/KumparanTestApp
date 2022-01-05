import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from "../../assets/avatar5.png"
import avatarComment1 from "../../assets/avatar1.png"
import avatarComment2 from "../../assets/avatar2.png"
import avatarComment3 from "../../assets/avatar3.png"
import avatarComment4 from "../../assets/avatar4.png"
import avatarComment5 from "../../assets/avatar6.png"
import axios from 'axios'

const detailPost = ({ route, navigation }) => {
    const { id } = route.params;
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                const postData = res.data;
                setPost(postData)
            })

        axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
            .then(res => {
                const userData = res.data;
                setUser(userData)
            })

        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => {
                const userComments = res.data;
                setUserComments(userComments)
                setIsLoading(false)
            })
    }, [post.userId, id])

    const CommentList = ({ comments }) => {

        const [index, setIndex] = useState([])

        const avatar = [
            avatarComment1,
            avatarComment2,
            avatarComment3,
            avatarComment4,
            avatarComment5,
        ];

        useEffect(() => {
            const changeImage = () => {
                const randomNumber = Math.floor(Math.random() * avatar.length);
                setIndex(randomNumber)
            }

            changeImage();
        }, [])


        return (
            <View style={{
                borderBottomWidth: 0.19,
                borderBottomColor: '#333',
                paddingHorizontal: 20,
                paddingVertical: 10
            }}>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <Image source={avatar[index]} style={styles.commentProfile} />
                    <View style={{ paddingHorizontal: 10, width: wp('80%') }}>
                        <Text style={styles.teksJudul}>{comments.name}</Text>
                        <Text style={styles.teksJudulUsername}>{comments.email}</Text>
                        <View style={{ paddingTop: 5, paddingLeft: 20, borderLeftWidth: 0.5, borderColor: '#fff' }}>
                            <Text style={styles.teksComments}>{comments.body}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <ActivityIndicator color={"#fff"} />}
            <View style={{
                borderBottomWidth: 0.19,
                borderBottomColor: '#333',
                paddingHorizontal: 10,
                paddingVertical: 10
            }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}
                    onPress={() =>
                        navigation.navigate('detailUser', {
                            id: user.id,
                        })}>
                    <Image source={avatar} style={styles.userProfile} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.teksJudul}>{user.name}</Text>
                        <Text style={styles.teksJudulUsername}>@{user.username}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
                    <Text style={styles.teksJudulPost}>" {post.title} "</Text>
                    <Text style={styles.teksPost}>{post.body}</Text>
                </View>
            </View>
            <ScrollView>
                {userComments.length > 0 &&
                    userComments.map((userComments) => {
                        return (
                            <CommentList
                                key={userComments.id}
                                comments={userComments}
                            />
                        );
                    })}
            </ScrollView>
        </View>
    )
}

export default detailPost

const styles = StyleSheet.create({
    userProfile: {
        width: 50,
        height: 50,
    },
    commentProfile: {
        width: 45,
        height: 45,
    },
    teksJudul: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fafafa'
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
        color: '#fff',
        textTransform: 'capitalize'
    },
    teksPost: {
        fontSize: 13,
        fontWeight: '100',
        color: '#fff',
        marginTop: 5
    },
    teksComments: {
        fontSize: 13,
        fontWeight: '100',
        color: '#fff',
    }
})
