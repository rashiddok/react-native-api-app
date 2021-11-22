import React, { useEffect } from 'react';
import {useState} from 'react';
import { Image, StyleSheet, Text, View, Pressable} from 'react-native';

import {AsyncStorage} from 'react-native';

import axios from 'axios';

const Product = ({navigation}) => {

    const [data, setData] = useState<any>({});

    useEffect(() => {
        getData();
      }, [])

    const getData = async () => {
        const id = await AsyncStorage.getItem('productId')
        axios.get(`https://fakestoreapi.com/products/${id}`).then(res=> {
            const product = res.data
            setData(product)
        })
    }

    const addToCart = async(productId: string) =>{
        const savedItems = await AsyncStorage.getItem('cart')
        console.log(savedItems)
        if(savedItems){
          const cart: any[] = JSON.parse(savedItems)
          const ind = cart.findIndex(v=> v.id === productId)
          if(ind !== -1){
           cart[ind].count += 1
          } else{
            cart.push({id: productId, count: 1})
          }
           await AsyncStorage.setItem('cart', JSON.stringify(cart))
         return 
        }
        const item = {id: productId, count: 1}
        await AsyncStorage.setItem('cart', JSON.stringify([item]))
    }

    return (
        <View style={styles.view}>
          <Image
          style={styles.image}
            resizeMode="contain"
            source={{ uri: data.image }}
          />
          <Text style={styles.price}>${data.price}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <Pressable style={styles.button} onPress={async() => addToCart(data.id)}><Text style={styles.buttonText}>+ Add</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 15,
        borderRadius: 5
    },
    button: {
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        marginTop: 15
    },
    buttonText: {
        color: '#000',
        fontSize: 15
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
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    category: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10,
    },
    description: {
        width: '100%',
        textAlign: 'justify',
        fontSize: 18,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    price: {
        fontSize: 24,
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

export default Product;