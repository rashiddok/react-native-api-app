import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, View, Text, AsyncStorage, Pressable} from 'react-native';

const Cart = ({navigation}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    AsyncStorage.getItem('cart').then(
      res => {
        if (!res) {
          return;
        }
        const data: any[] = JSON.parse(res);
        const dataArray: any[] = [];
        data.forEach(async (element: any, index) => {
          const d = await getApiData(element.id);
          d.count = element.count;
          dataArray.push(d);
          if(index == data.length - 1){
            setData(dataArray);
          }
          
        });
        console.log(data)
      },
      err => {
        [{}];
      },
    );
  };

  const getApiData = async (id: string): Promise<any> => {
    const data = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.data);
    return data;
  };

  const removeFromCart = async (id: string) =>{
      const index = data.indexOf((v: any)=>v.id==id)
      data.splice(index, 1)
        setData(data)
        AsyncStorage.setItem('cart', JSON.stringify(data))
        await getData()
  }

  const changeCount = async (id: string, add: number) =>{
      const item = data.find(v=>v.id==id)
      item.count += add
      if(item.count == 0){
          removeFromCart(id)
          return
      }
        setData(data)
        AsyncStorage.setItem('cart', JSON.stringify(data))
        await getData()
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Cart</Text>
      {data?.map((v, key) => (
        <View key={key} style={styles.item}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: v.image}}
          />
          <View style={styles.column}>
          <Text>{v.title}</Text>
          <View style={styles.row}>
              <Text>Count</Text>
              <Pressable style={styles.symbol} onPress={()=> changeCount(v.id, -1)}>
                  <Text style={styles.symbol}>-</Text>
              </Pressable>
              <Text> {v.count}</Text>
              <Pressable style={styles.symbol} onPress={()=> changeCount(v.id, 1)}>
                  <Text style={styles.symbol}>+</Text>
              </Pressable>
              <Pressable style={styles.remove} onPress={()=> removeFromCart(v.id)}>
                  <Text style={styles.removeText}>Remove from cart</Text>
              </Pressable>
          </View>
          </View>
        </View>
      ))}
    </View>
  );
};

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
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  row: {
      display: 'flex',
      flexDirection: 'row',
      width: '90%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
},
symbol: {
    fontWeight: 'bold',
    fontSize: 18,
    marginEnd: 10,
    marginLeft: 10
},
remove:{
    marginLeft: 'auto'
},
removeText:{
    color: 'red'
},
  image: {
    height: 50,
    width: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cart;
