import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';

const TabItem = ({ isFocused, onLongPress, onPress, label }) => {

    const Icons = () => {
        if (label === "Home") return isFocused ? <Icon
            name='home'
            type='font-awesome'
            color='#02a6b0'
            size={25}
        /> : <Icon
            name='home'
            type='font-awesome'
            color='#fafafa'
            size={25}
        />

        if (label === "User") return isFocused ? <Icon
            name='user'
            type='font-awesome'
            color='#02a6b0'
            size={25}
        /> : <Icon
            name='user'
            type='font-awesome'
            color='#fafafa'
            size={25}
        />

        return isFocused ? <Icon
            name='home'
            type='font-awesome'
            color='#02a6b0'
            size={33}
        /> : <Icon
            name='home'
            type='font-awesome'
            color='#7f7f7f'
            size={33}
        />
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        title: {
            color: isFocused ? '#02a6b0' : '#7f7f7f',
            textAlign: 'center',
            fontWeight: '700'
        },
    })

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Icons size={25} />
            {/* <Text style={styles.title}>{label}</Text> */}
        </TouchableOpacity>
    )
}

export default TabItem

