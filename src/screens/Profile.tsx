import React, { useEffect } from 'react';
import {useState} from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const Profile = ({navigation}) => {

    return (
        <View style={styles.view}>
            <Image source={require('../avatar.jpeg')} style={styles.userAvatar}></Image>
            <Text style={styles.text}>Name: Rasheusky Maksim</Text>
            <Text style={styles.text}>Email: somebody@someone.com</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    userAvatar: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      text: {
          fontSize: 18,
          marginTop: 10,
          textAlign: 'left'
      }
})

export default Profile;