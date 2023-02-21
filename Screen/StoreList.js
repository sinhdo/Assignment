import { StyleSheet, Text, FlatList, Button, Image } from "react-native";
import {useNavigation} from '@react-navigation/native';

const StoreItem = (props) => {
    const item = props.data;
    const navigation = useNavigation();

    return (
        <>
            <Text>ID: {item.id}</Text>
            <Text>Tên cửa hàng: {item.ten}</Text>
            <Text>Địa chỉ: {item.diachi}</Text>
            <Text>Số điện thoại: {item.sdt}</Text>
            <Text>Trạng thái: {item.trangthai}</Text>
            <Image source={
                {uri: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F_400x400.jpg'}
            }
                style={styles.storeLogo}
            />
            <Button
                title="Xóa"
            />
            <Button
                title="Sửa"
                onPress={() => navigation.navigate("Them")}

            />
        </>
    );
}

const StoreList = (props) => {
    const list = props.data || {};

    return (
        <FlatList
            data={list}
            renderItem={({ item }) => <StoreItem data={item} />} 
            keyExtractor={(item) => item.storeID}
        />
    );
}

const styles = StyleSheet.create({
    storeLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default StoreList;