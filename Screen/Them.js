import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import QuanLy from './QuanLy';
import { API_PRODUCT } from './api';
import { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';




const Them = (props) => {
    const { navigation: nav, route } = props;
    const editData = route.params?.editData;
    const [ten, setTen] = useState('');
    const [id, setId] = useState('');
    const [diachi, setDiachi] = useState('');
    const [sdt, setSdt] = useState('');
    const [trangthai, setTrangThai] = useState('');
    const [img, setImg] = useState(null);



    const pickImage = async () => {


        // const [img_source, setimg_source] = useState(null)
        // const [img_base64, setiimg_base64] = useState(null)
        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });


        console.log(result);


        if (!result.canceled) {
            setImg(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setImg("data:image/" + file_ext + ";base64," + res);
                    console.log(logo);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }
    }



    useEffect(() => {
        if (editData) {
            setImg(editData.img);
            setTen(editData.ten);
            setDiachi(editData.diachi);
            setSdt(editData.sdt);
            setTrangThai(editData.trangthai);
        }
    }, [editData?.id]);

    const onSave = () => {
        const newObj = { ten, diachi, sdt, trangthai, img };
        // const newDiaChi = { diachi }; 
        // const newSdt = { sdt }; 
        // const newTrangThai = { trangthai }; 
        // const list=[newTen,newDiaChi,newSdt,newTrangThai];

        fetch(
            !editData ? API_PRODUCT : `${API_PRODUCT}/${editData.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: !editData ? 'POST' : 'PUT',
                body: JSON.stringify(newObj)
            }
        ).then((res) => nav.goBack());
        // Khi thành công sẽ quay trở lại mh trc đó
    };


    return (
        <View style={styles.con}>

            <Button title="TAKE A PICTURE" onPress={pickImage} />
            {img &&
                <Image source={
                    { uri: img }

                }
                    style={{ width: 150, height: 150, margin: 10 }}
                />}

            <TextInput style={styles.input}
             placeholder='Tên cửa hàng' value={ten} onChangeText={(text) => setTen(text)}
            />
            <TextInput style={styles.input}
             placeholder='Địa chỉ' value={diachi} onChangeText={(text) => setDiachi(text)}
            />
            <TextInput style={styles.input}
             placeholder='Số Điện Thoại' keyboardType='numeric' value={sdt} onChangeText={(text) => setSdt(text)}
            />
            <TextInput style={styles.input}
             placeholder='Trạng thái(0/1)' keyboardType='numeric' value={trangthai} onChangeText={(text) => setTrangThai(text)} />

            <View style={styles.abc}>
                <Button title={'Lưu'} onPress={onSave} />
                <Button title='Huỷ' onPress={() => { nav.navigate('QuanLy') }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    con: {
        padding: 10,
    },
    input: {
        width: 360,
        height: 50,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 10,
        margin: 5
    },
    abc: {
        paddingTop: 10
    },




})

export default Them;
