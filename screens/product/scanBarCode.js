import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, MD2Colors } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function ScanBarCode(props) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status)
  };
  getBarCodeScannerPermissions();

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    props.onBarCodeScanned(data)
    setTimeout(function(){
      setScanned(false)
    }, 1000)
  }

  return (
    <View>
      <Text style={styles.title}>Quét mã vạch</Text>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={
            scanned ? undefined : handleBarCodeScanned.bind(this)
          }
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && <Button onPress={() => setScanned(false)} >Tap to Scan Again</Button>}
      <Button mode="contained" style={{ marginTop: 10 }} buttonColor={MD2Colors.green400} textColor={MD2Colors.white} onPress={ console.log("hello") } rippleColor={MD2Colors.white}>Nhập bằng tay</Button>
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    width: "100%",
    height: "80%",
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center"
  }
});