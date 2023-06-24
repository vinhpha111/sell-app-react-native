import React from "react"
import { View, StyleSheet } from "react-native"
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux';
import { getIsLoading } from '../store/loadingSlice'

export default function LoadingComponent() {
  return (
    <Spinner
      visible={useSelector(getIsLoading)}
      textContent={null}
      textStyle={styles.spinnerTextStyle}
    />
  )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
