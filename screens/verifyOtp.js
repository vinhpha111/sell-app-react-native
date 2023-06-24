import React, {useState} from "react"
import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import { setLoading } from "../store/loadingSlice"
import { useDispatch } from "react-redux"
import fetch from "../network/fetch"
import * as secureStore from "expo-secure-store"
import { CommonActions } from '@react-navigation/native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 16},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 6;

export default function VerifyOtp({navigation, route}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Hãy nhập mã otp được gửi qua số điện thoại {route.params.phone}</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        caretHidden={false}
        value={value}
        onChangeText={(text) => {
          setValue(text)
          if (text.length === CELL_COUNT) {
            dispatch(setLoading(true))
            fetch("api/users/login-otp", {
              method: "POST",
              body: JSON.stringify({
                phone: route.params.phone,
                code: text
              })
            })
            .then(async (res) => {
              if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                await secureStore.setItemAsync("token", data.token)
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                  })
                )
              }
            })
            .finally(() => {
              dispatch(setLoading(false))
            })
          }
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  )
}