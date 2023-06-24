import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Pressable, Image, Alert, FlatList } from 'react-native';
import { Button, MD3Colors, TextInput, Text, MD2Colors, Surface, Dialog, Portal, List } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import ScanBarCode from './scanBarCode'
import { useDispatch } from 'react-redux';
import { setLoading } from "../../store/loadingSlice"
import * as ImagePicker from 'expo-image-picker';
import fetch from '../../network/fetch'

export default function ProductAdd() {
  const [unit, setUnit] = useState('')
  const [image, setImage] = useState(null);
  const [productsRecommand, setProductsRecommand] = useState([])

  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onBarCodeScanned = async function(barcode) {
    setModalVisible(false)
    dispatch(setLoading(true))
    await fetch('api/get-product-info-by-barcode?'+ new URLSearchParams({
      barcode
    }))
      .then(async res => {
        const json = await res.json()
        const results = json.items
        if (results) {
          setProductsRecommand(results)
        }
      })
    
    dispatch(setLoading(false))
    showDialog()
  }

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <ScrollView>
      <View style={{ padding: 10}}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex:1, paddingRight: 10 }}>
              <TextInput
                label="Nhập hoặc quét barcode*"
                mode="outlined"
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                keyboardType='number-pad' maxLength={10}></TextInput>
            </View>
            <View style={{ width: 80, paddingTop: 10 }}>
              <Button
                icon="camera"
                mode="contained"
                buttonColor={MD3Colors.primary40}
                onPress={() => setModalVisible(true)}
              >Quét</Button>
            </View>
          </View>
        </View>
        <View style= {{ marginTop: 10 }}>
          <TextInput
            mode="outlined"
            label="Tên sản phẩm"
            ref={(input) => { this.secondTextInput = input; }}
            keyboardType='default' maxLength={10}></TextInput>
        </View>
        <View style= {{ marginTop: 10 }}>
        <Surface style={styles.imageInputContainer} elevation={0}>
          {!image && <Image style={ styles.imageInputBackground } source={require('../../assets/image-choose-icon.png')}/>}
          {!image && <Text onPress={pickImage} style={styles.imageInputText}>Chọn hình ảnh</Text>}
          {image && <Image style={ styles.imageInputSelected } source={{ uri: image }} />}
          { image && <IconFeather style={ styles.imageInputEditIcon } name="edit" size={24} onPress={pickImage}/> }
        </Surface>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
              style={{ backgroundColor: '#fffbfe', borderColor: '#8F8F8F', borderWidth: 1, borderRadius: 4 }}>
            <Picker
              mode="dropdown"
              selectedValue={unit}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue) {
                  setUnit(itemValue)
                }
              }}
            >
              <Picker.Item style={{ color: "#696969" }} enabled={!unit} label="Chọn đơn vị" value="" />
              <Picker.Item label="cái" value="pc" />
              <Picker.Item label="Kg" value="kg" />
            </Picker>
          </View>
        </View>
        <Text style={{ textAlign: "right", color: MD2Colors.lightBlue600, fontWeight: "bold" }}>+Thêm đơn vị</Text>
        <View
          style= {{ marginTop: 10 }}
        >
          <TextInput
            label="Số lượng"
            mode="outlined"
            ref={(input) => { this.secondTextInput = input; }}
            keyboardType='numeric'></TextInput>
        </View>
        <View
          style= {{ marginTop: 10 }}
        >
          <Text variant="titleMedium"></Text>
          <TextInput
            label="Đơn giá(VNĐ)"
            mode="outlined"
            ref={(input) => { this.secondTextInput = input; }}
            keyboardType='numeric'
          ></TextInput>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.closeBtnHeader]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Icon name="close" size={30} />
            </Pressable>
            <View style={ styles.ScanBarContainer }>
              <ScanBarCode onBarCodeScanned={onBarCodeScanned}/>
            </View>
          </View>
        </View>
      </Modal>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Chọn Sản phẩm gợi ý</Dialog.Title>
          <Dialog.Content>
            <List.Section>
              <FlatList
                data={productsRecommand}
                renderItem={
                  ({item}) => 
                  <List.Item
                    title={item.name}
                    left={() => <Image source={{uri: item.img}} width={50} height={50} />}
                  />
                }
              />
            </List.Section>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%"
  },
  closeBtnHeader: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  ScanBarContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  imageInputContainer: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#8F8F8F"
  },
  imageInputBackground: {
    width: 80,
    height: 70,
    aspectRatio: 1,
    opacity: 0.3,
    tintColor: MD2Colors.lightBlue400
  },
  imageInputText: {
    position: "absolute",
    textAlign: "center",
    color: '#696969'
  },
  imageInputSelected: {
    width: 80,
    height: 80,
    aspectRatio: 1,
    borderRadius: 4,
  },
  imageInputEditIcon: {
    position: "absolute",
    textAlign: "center",
    right: 4,
    bottom: 4,
    color: MD2Colors.lightBlue600
  },
})