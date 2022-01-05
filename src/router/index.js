import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import logo from "../assets/kumparan-brand.png"
import logoTeks from "../assets/kumparan-teks.png"
import { Home, User, Splash, detailPost, detailUser, detailPhoto } from '../pages';
import { BottomNavigator } from '../components/';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} state={{ ...props.state, routes: props.state.routes.slice(0, 2) }} backBehavior="history" />}>
            <Tab.Screen name="Home" component={Home} options={({ navigation, route }) => ({
                headerStyle: {
                    backgroundColor: '#131313',
                    borderBottomWidth: 0.19,
                    borderBottomColor: '#333',
                    height: 60,
                    elevation: 0,
                },
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} style={{ height: 30, width: 30 }} />
                        <Text style={{ color: '#02a6b0', fontSize: 28, fontWeight: '700', marginHorizontal: 10 }}>news</Text>
                    </View>
                ),
                headerBackVisible: false,
                headerTitleAlign: 'center',
            })} />
            <Tab.Screen name="User" component={User} options={({ navigation, route }) => ({
                headerStyle: {
                    backgroundColor: '#131313',
                    borderBottomWidth: 0.19,
                    borderBottomColor: '#333',
                    height: 60,
                    elevation: 0,
                },
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} style={{ height: 30, width: 30 }} />
                        {/* <Image source={logoTeks} style={{ height: 50, width: 150 }} /> */}
                        <Text style={{ color: '#02a6b0', fontSize: 28, fontWeight: '700', marginHorizontal: 10 }}>users</Text>
                    </View>
                ),
                headerBackVisible: false,
                headerTitleAlign: 'center',
            })} />
            <Tab.Screen name="detailPost" component={detailPost} options={({ navigation, route }) => ({
                headerStyle: {
                    backgroundColor: '#131313',
                    borderBottomWidth: 0.19,
                    borderBottomColor: '#333',
                    height: 60,
                    elevation: 0,
                },
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} style={{ height: 30, width: 30 }} />
                        <Text style={{ color: '#02a6b0', fontSize: 28, fontWeight: '700', marginHorizontal: 10 }}>tweet</Text>
                    </View>
                ),
                headerLeft: () => {
                    return (
                        <View style={{
                            justifyContent: 'center',
                            width: 80,
                            height: 35,
                            marginLeft: -30,
                        }}>
                            <FontAwesome5
                                name="arrow-left"
                                solid
                                size={23}
                                color="#fafafa"
                                style=
                                {{
                                    alignSelf: 'flex-end',
                                    paddingHorizontal: 20,
                                }}
                                onPress={() => navigation.goBack()} />
                        </View>
                    )
                },
                headerBackVisible: false,
                headerTitleAlign: 'center',
            })} />
            <Tab.Screen name="detailUser" component={detailUser} options={({ navigation, route }) => ({
                headerStyle: {
                    backgroundColor: '#131313',
                    borderBottomWidth: 0.19,
                    borderBottomColor: '#333',
                    height: 60,
                    elevation: 0,
                },
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} style={{ height: 30, width: 30 }} />
                        {/* <Image source={logoTeks} style={{ height: 50, width: 150 }} /> */}
                        <Text style={{ color: '#02a6b0', fontSize: 28, fontWeight: '700', marginHorizontal: 10 }}>users</Text>
                    </View>
                ),
                headerLeft: () => {
                    return (
                        <View style={{
                            justifyContent: 'center',
                            width: 80,
                            height: 35,
                            marginLeft: -30,
                        }}>
                            <FontAwesome5
                                name="arrow-left"
                                solid
                                size={23}
                                color="#fafafa"
                                style=
                                {{
                                    alignSelf: 'flex-end',
                                    paddingHorizontal: 20,
                                }}
                                onPress={() => navigation.navigate('User')} />
                        </View>
                    )
                },
                headerBackVisible: false,
                headerTitleAlign: 'center',
            })} />
            <Tab.Screen name="detailPhoto" component={detailPhoto} options={({ navigation, route }) => ({
                headerStyle: {
                    backgroundColor: '#131313',
                    borderBottomWidth: 0.19,
                    borderBottomColor: '#333',
                    height: 60,
                    elevation: 0,
                },
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={logo} style={{ height: 30, width: 30 }} />
                        {/* <Image source={logoTeks} style={{ height: 50, width: 150 }} /> */}
                        <Text style={{ color: '#02a6b0', fontSize: 28, fontWeight: '700', marginHorizontal: 10 }}>media</Text>
                    </View>
                ),
                headerLeft: () => {
                    return (
                        <View style={{
                            justifyContent: 'center',
                            width: 80,
                            height: 35,
                            marginLeft: -30,
                        }}>
                            <FontAwesome5
                                name="arrow-left"
                                solid
                                size={23}
                                color="#fafafa"
                                style=
                                {{
                                    alignSelf: 'flex-end',
                                    paddingHorizontal: 20,
                                }}
                                onPress={() => navigation.goBack()} />
                        </View>
                    )
                },
                headerBackVisible: false,
                headerTitleAlign: 'center',
            })} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
