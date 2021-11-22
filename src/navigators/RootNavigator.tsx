import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Product from '../screens/Product';
import Profile from '../screens/Profile';
import Cart from '../screens/Cart';

const Stack = createStackNavigator();


export const RootNavigator = () => {
	return (
		
	<Stack.Navigator initialRouteName={'Home'}>
		<Stack.Screen name={'Home'} component={Home} />
		<Stack.Screen name={'Product'} component={Product} />
		<Stack.Screen name={'Profile'} component={Profile} />
		<Stack.Screen name={'Cart'} component={Cart} />
	</Stack.Navigator>
	);
};