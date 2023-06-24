import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductScreen from './product';
import CustomerScreen from './customer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from "react-redux"
import {getUser, initUser} from '../store/authSlice'
import { setLoading } from '../store/loadingSlice'
import fetchUserLogin from '../network/fetchUserLogin'
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Main({navigation}) {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchUserLogin().then(data => {
      if (data.user) {
        dispatch(initUser(data.user))
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        )
      }
    })
  }, [])
  const logout = async () => {
    dispatch(setLoading(true))
    dispatch(initUser({}))
    await SecureStore.deleteItemAsync("token")
    dispatch(setLoading(false))
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    )
  }

  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#2F4F4F' },
        headerTitleStyle: { color: 'white' },
        headerRight: () => (
          <Button onPress={logout} title="Logout"/>
        ),
        headerShown: false
      })}
    >
      <Tab.Screen
        name="product"
        component={ProductScreen}
        options={{
          tabBarLabel: 'Sản phẩm',
          title: 'Sản phẩm',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'pizza' : 'pizza-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="customer"
        component={CustomerScreen}
        options={{
          tabBarLabel: 'Khách hàng',
          title: 'Khách hàng',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}