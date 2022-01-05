import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import avatar from "../../assets/avatar5.png"
import jumbotron from "../../assets/jumbotron.png"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

const detailUser = ({ route, navigation }) => {
    const { id } = route.params;
    const [user, setUser] = useState([]);
    const [post, setPost] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [company, setCompany] = useState([]);
    const [address, setAddress] = useState([]);
    const [choose, setChoose] = useState('tweet');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                const userData = res.data;
                const userCompany = res.data.company;
                const userAddress = res.data.address;
                setUser(userData)
                setCompany(userCompany)
                setAddress(userAddress)
            })

        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(res => {
                const postData = res.data;
                setPost(postData)
            })


        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then(res => {
                const userAlbum = res.data;
                setAlbums(userAlbum)
            })

    }, [id])

    const PostList = ({ post, navigation }) => {
        const [user, setUser] = useState([]);

        useEffect(() => {
            axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                .then(res => {
                    const userData = res.data;
                    setUser(userData)
                })
        }, [post.userId])

        return (
            <TouchableOpacity style={styles.containerPost} onPress={navigation}>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <Image source={avatar} style={styles.userProfile} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.teksJudul}>{user.name} </Text>
                        <Text style={styles.teksJudulUsername}>@{user.username}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
                    <Text style={styles.teksJudulPostTweet}>" {post.title} "</Text>
                    <Text style={styles.teksPost}>{post.body} . . .</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const AlbumList = ({ albums }) => {
        const [user, setUser] = useState([]);
        const [photoData, setPhotoData] = useState([]);

        useEffect(() => {
            axios.get(`https://jsonplaceholder.typicode.com/albums/${albums.id}/photos`)
                .then(res => {
                    const data = res.data;
                    setPhotoData(data)
                    setIsLoading(false)
                })

        }, [albums.id])

        console.log(photoData)

        useEffect(() => {
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(res => {
                    const userData = res.data;
                    setUser(userData)
                })
        }, [id])

        const PhotoList = ({ thumb, navigation }) => {
            console.log(thumb)

            return (
                <TouchableOpacity onPress={navigation}>
                    <Image source={{ uri: thumb.thumbnailUrl }} style={{ width: 100, height: 100, margin: 5 }} />
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.containerPost}>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <Image source={avatar} style={styles.userProfile} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.teksJudul}>{user.name} </Text>
                        <Text style={styles.teksJudulUsername}>@{user.username}</Text>
                    </View>
                </View>
                <View style={{ paddingVertical: 10, alignSelf: 'center' }}>
                    <Text style={styles.teksJudulPost}>{albums.title}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: wp('85%'),
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {photoData.length > 0 &&
                        photoData.map((photoData) => {
                            return (
                                <PhotoList
                                    key={photoData.id}
                                    thumb={photoData}
                                    navigation={() =>
                                        navigation.navigate('detailPhoto', {
                                            id: photoData.id,
                                            user: user.id,
                                            album: albums.title
                                        })}
                                />
                            );
                        })}
                </View>
            </View>
        )
    }

    const TweetAlbum = () => {
        if (choose === 'tweet') {
            return (
                <View>
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
                                />
                            );
                        })}
                </View>
            )
        }

        if (choose === 'album') {
            return (
                <View>
                    {albums.length > 0 &&
                        albums.map((albums) => {
                            return (
                                <AlbumList
                                    key={post.id}
                                    albums={albums}
                                />
                            );
                        })}
                </View>
            )
        }

        return (
            <View>
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
                            />
                        );
                    })}
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, position: 'relative' }}>
                {isLoading && <ActivityIndicator color={"#fff"} />}
                <Image source={jumbotron} style={styles.jumbotron} />
                <View style={styles.containerProfil}>
                    <Image source={avatar} style={styles.userProfiles} />
                </View>
                <View style={{ marginTop: 50, marginLeft: 10 }}>
                    <Text style={styles.name}>{user.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, width: wp('95%'), flexWrap: 'wrap' }}>
                        <Text style={styles.username}>@{user.username}</Text>
                        <Text style={styles.username}> . </Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
                        <View style={{ width: wp('10%'), alignItems: 'center' }}>
                            <FontAwesome5
                                name="briefcase"
                                solid
                                size={18}
                                color="#fafafa" />
                        </View>
                        <View style={{ width: wp('83%'), flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={styles.company}>{company.catchPhrase}</Text>
                            <Text style={styles.company}> at </Text>
                            <Text style={styles.email}>{company.name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
                        <View style={{ width: wp('10%'), alignItems: 'center' }}>
                            <FontAwesome5
                                name="map-marker-alt"
                                solid
                                size={18}
                                color="#fafafa" />
                        </View>
                        <View style={{ width: wp('83%'), flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={styles.company}>{address.suite}</Text>
                            <Text style={styles.company}> {address.street}</Text>
                            <Text style={styles.company}>, </Text>
                            <Text style={styles.company}>{address.city}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
                        <View style={{ width: wp('10%'), alignItems: 'center' }}>
                            <FontAwesome5
                                name="phone"
                                solid
                                size={18}
                                color="#fafafa" />
                        </View>
                        <View style={{ width: wp('83%'), flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={styles.email}>{user.phone}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, }}>
                        <View style={{ width: wp('10%'), alignItems: 'center' }}>
                            <FontAwesome5
                                name="google"
                                solid
                                size={18}
                                color="#fafafa" />
                        </View>
                        <View style={{ width: wp('83%'), flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={styles.email}>{user.website}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: wp('100%'),
                    height: 50,
                    marginBottom: 10
                }}>
                    <TouchableOpacity style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomColor: '#02a6b0',
                        borderBottomWidth: choose === 'tweet' ? 3 : 0,
                    }}
                        onPress={() => setChoose('tweet')}>
                        <Text style={{
                            color: '#fff',
                            opacity: choose === 'tweet' ? 1 : 0.7,
                            fontSize: 17,
                            paddingHorizontal: 20
                        }}>Tweet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomColor: '#02a6b0',
                        borderBottomWidth: choose === 'album' ? 3 : 0
                    }}
                        onPress={() => setChoose('album')}>
                        <Text style={{
                            color: '#fff',
                            opacity: choose === 'album' ? 1 : 0.7,
                            fontSize: 17,
                            paddingHorizontal: 20
                        }}>Album</Text>
                    </TouchableOpacity>
                </View>
                <TweetAlbum />
            </View>
        </ScrollView>
    )
}

export default detailUser

const styles = StyleSheet.create({
    jumbotron: {
        width: wp('100%'),
        height: 150,
    },
    containerProfil: {
        width: 95,
        height: 95,
        position: 'absolute',
        top: 110,
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    userProfiles: {
        width: 80,
        height: 80,
    },
    name: {
        fontSize: 20,
        color: '#fff'
    },
    username: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8
    },
    email: {
        color: '#02a6b0',
        fontSize: 16
    },
    company: {
        color: '#fff',
        fontSize: 16
    },
    containerPost: {
        width: wp('100%'),
        backgroundColor: '#131313',
        borderBottomWidth: 0.19,
        borderBottomColor: '#333',
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
    teks: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fafafa'
    },
    teksJudulPost: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fafafa',
        textTransform: 'capitalize',
        textAlign: 'center',
        marginVertical: 10
    },
    teksJudulPostTweet: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fafafa',
        textTransform: 'capitalize',
        marginVertical: 10
    },
    teksPost: {
        fontSize: 13,
        fontWeight: '100',
        color: '#fafafa',
        opacity: 0.8
    }
})
