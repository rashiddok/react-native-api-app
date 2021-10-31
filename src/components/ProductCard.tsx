import React, { useEffect } from 'react';
import {useState} from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {AsyncStorage} from 'react-native';

const ProductCard = (props) => {

    const setItemId = async (id: string | number) => {
        await AsyncStorage.setItem('productId', ''+id)
        return props.navigation.navigate('Product')
    }

    return (
        <Pressable style={styles.view} onPress={async() => setItemId(props.id)}>
          <Image
          style={styles.image}
            resizeMode="contain"
            source={{ uri: props.image }}
          />
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>{props.title}</Text>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.category}>{props.category}</Text>
          <Text style={styles.price}>${props.price}</Text>
          <View style={styles.flexRow}>
            <Image style={styles.rating} source={require('../rating.png')}></Image>
            <Text>{props.rating}</Text>
          </View>
          
        </Pressable>
    );

};


const styles = StyleSheet.create({
    view: {
        width: '45%',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 5
    },
    image: {
        height: 150,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    title: {
        width: '100%',
        textAlign: 'left',
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#000'
    },
    category: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10,
    },
    price: {
        fontSize: 20,
        color: '#000',
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'left',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5
    },
    rating: {
        width: 10,
        height: 10,
        marginRight: 5
    }
})

export default ProductCard;