import React, {useState} from 'react'
import { View, Text, Alert } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import fetch from '../network/fetch'
import { APP_ENV } from "@env"

export default function Regster({navigation}) {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  return (
    <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <TextInput onChangeText={newPhone => setPhone(newPhone)} mode="outlined" label="Số điện thoại" keyboardType="phone-pad" maxLength={10} ></TextInput>
      <TextInput onChangeText={newName => setName(newName)} style={{  marginTop: 10 }} mode="outlined" label="Tên cửa hàng" ></TextInput>
      <Text>{phone}</Text>
      <Text>{name}</Text>
      <Text>{APP_ENV}</Text>
      <Button
        mode="contained"
        style={{ marginTop: 10 }}
        onPress={() => {
          fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
              phone,
              name
            })
          }).then(res => {
            if (res.status === 200) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'VerifyOtp', params: {
                    phone
                  } }],
                })
              )
            } else {
              Alert.alert('error', 'has error')
            }
          })
          .catch((error) => {
            console.log(error)
          })
        }}
      >Đăng ký</Button>
    </View>
  )
}