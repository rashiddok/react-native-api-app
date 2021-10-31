import React, { useEffect } from 'react';
import {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';

const Home = ({navigation}) => {
    const [data, setData] = useState<any[]>([{}]);
    const [filterData, setFilterData] = useState<any[]>([]);

    useEffect(() => {
        getData();
      }, []);

    const getData = async () => {
        axios.get('https://fakestoreapi.com/products').then(res=> {
            const allProducts = res.data
            setData(allProducts)
            setFilterData(allProducts)
        }, err=> {
          setFilterData([])
        })
    }

    const onSearchChange = (e: string) => {
      const filteredData = data.filter(v=>v.title.toLowerCase().includes(e.toLowerCase()))
      setFilterData(filteredData)
    }

    if(filterData.length > 1){
      return (
        <ScrollView
          contentContainerStyle={styles.container}>
            <View style={styles.profileRow}>
            <Pressable onPress={async() => navigation.navigate('Profile')}>
              <Image source={require('../avatar.jpeg')} style={styles.userAvatar}></Image>
              </Pressable>
            </View>
          <TextInput placeholder="Search..." style={styles.search} onChangeText={onSearchChange}></TextInput>
          {
         filterData?.map((v, key)=>
                <ProductCard key={key} category={v.category} image={v.image} title={v.title} price={v.price} rating={v.rating.rate} id={v.id} navigation={navigation}></ProductCard>
            )
              }
        </ScrollView>
      );
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000'
        }}>No data found:(</Text>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  search: {
    width: '95%',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 20,
    paddingLeft: 15,
    marginRight: 20
  },
  profileRow: {
    width: '100%',
    marginTop: 20,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default Home;
