import React from 'react';
import { Text, View, Alert } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Button, MD3Colors } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const ProductHomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
      <Text>Chưa có sản phẩm nào!</Text>
      <Button icon="plus" mode="contained" buttonColor={MD3Colors.primary20} onPress={() => navigation.navigate('productAdd')}>
        THÊM SẢN PHẨM
      </Button>
    </View>
  );
};

export default class Product extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: true
        })}
      >
        <Stack.Screen
          name="productHome"
          component={ProductHomeScreen}
          options={{
            title: "Danh sách sản phẩm"
          }}
        />
      </Stack.Navigator>
    )
  }
}