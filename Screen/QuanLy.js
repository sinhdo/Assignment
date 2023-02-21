import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Modal, TextInput, FlatList, Pressable, Image, Alert } from 'react-native';
import { NavigationContainer, isFocused, useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Them from './Them';
import StoreList from './StoreList';
import { API_PRODUCT } from './api'

const QuanLy = (props) => {
  const nav = props.navigation;
  const [ten, setTen] = useState('');
  const [id, setId] = useState('');
  const [diachi, setDiachi] = useState('');
  const [sdt, setSdt] = useState('');
  const [trangthai, setTrangThai] = useState('');
  const [img, setImg] = useState('');


  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const getUsers = () => {
    fetch(API_PRODUCT)
      .then(res => res.json())
      .then(data => {
        setList(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, [isFocused]);

  const onEdit = (editId) => {

    fetch(`${API_PRODUCT}/${editId}`)
      .then(res => res.json())
      .then(data => nav.navigate(
        'Them',
        { editData: data }
      ))

  };
  const check = (item) => {
    if (item == 1) {
      return "Hoạt Động";
    }
    else if (item == 0) {
      return "Ngừng Hoạt Động";
    } else {
      return "Chưa cập nhật";
    }
  }

  const onDelete = (deleteId) => {


    fetch(`${API_PRODUCT}/${deleteId}`, {
      method: 'DELETE'
    }).then(res => getUsers());
  };
  const confirm = (item) => {
    Alert.alert(
      'Xác nhận xoá cửa hàng ' + item, 'Khi đã xoá sẽ không thể khôi phục',
      [
        {
          text: 'Yes',
          onPress: () => {
            onDelete(item);
          }
        }, {
          text: 'No',
          onPress: () => {
            console.log("Chon no");
          }
        }
      ]
    )
  }

  return (
    <View>
      <Button title='Thêm mới'
        onPress={() => { nav.navigate('Them') }} />
      {
        isLoading
          ? <Text style={{ fontSize: 40 }}
          >Loading...</Text>
          : <FlatList
            data={list}
            renderItem={({ item }) =>
              <View style={styles.item}>
                <View style={styles.info}>
                  <Image
                    style={styles.img}
                    source={
                      { uri: item.img }
                    } />
                  <Text style={{ fontSize: 20 }}>ID : {item.id}</Text>
                  <Text style={{ fontSize: 20 }}>Tên : {item.ten}</Text>
                  <Text style={{ fontSize: 20 }}>Địa chỉ: {item.diachi}</Text>
                  <Text style={{ fontSize: 20 }}>SĐT : {item.sdt}</Text>
                  <Text style={{ fontSize: 20 }}>Trạng thái : {check(item.trangthai)}</Text>
                </View>
                <View style={styles.cn}>
                  <Pressable style={styles.btn} onPress={() => onEdit(item.id)}>
                    <Text>Sửa</Text>
                  </Pressable>
                  <Pressable style={styles.btn} onPress={() =>
                  //  onDelete(item.id)
                  { confirm(item.id) }
                  }>
                    <Text>Xoá</Text>
                  </Pressable>

                </View>
              </View>}
            keyExtractor={(item) => item.id}
          />
      }
    </View>
  );
}
const styles = StyleSheet.create({
  ds: {
    textAlign: 'right'

  },
  img: {
    width: 60,
    height: 60
  },
  item: {
    borderColor: 'red',
    width: 400,
    height: 230,
    borderStyle: 'solid',
    paddingTop: 15,
    marginTop: 10,
    marginLeft: 12,
    flexDirection: 'row',

  },
  info: {
    textAlign: 'center',
    paddingTop: 10,
    borderColor: 'red', borderWidth: 1,
    width: 260,
    height: 210,
    paddingLeft: 10,
    backgroundColor: 'yellow'

  },
  cn: {
    width: 100,
    height: 210,
    paddingLeft: 20,
    paddingTop: 60,
    backgroundColor: 'orange',
    borderColor: 'blue',
    borderWidth: 1
  },
  btn: {
    backgroundColor: 'blue',
    width: 60,
    height: 30,
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 15
  }
})

export default QuanLy;
