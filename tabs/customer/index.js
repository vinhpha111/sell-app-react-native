import React from 'react';
import { Text, View, Alert } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomerAddScreen from './add'
import { Button, MD3Colors } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const CustomerHomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
      <Text>Chưa có khách hàng nào!</Text>
      <Button icon="plus" mode="contained" buttonColor={MD3Colors.primary20} onPress={() => navigation.navigate('customerAdd')}>
        THÊM KHÁCH HÀNG
      </Button>
    </View>
  );
};

export default class Customer extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: true
        })}
      >
        <Stack.Screen
          name="customerHome"
          component={CustomerHomeScreen}
          options={{
            title: "Danh sách khách hàng"
          }}
        />
        <Stack.Screen
          name="customerAdd"
          component={CustomerAddScreen}
          options={{
            title: "Thêm mới khách hàng"
          }}
        />
      </Stack.Navigator>
    )
  }
}