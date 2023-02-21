import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import QuanLy from './Screen/QuanLy';
import ThongTin from './Screen/ThongTin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Them from './Screen/Them';
import StoreList from './Screen/StoreList';


const Stack = createNativeStackNavigator();

const Home = (props) => {
  const nav = props.navigation;
 
  return (<View>

      <Image source={
        { uri: 'https://antimatter.vn/wp-content/uploads/2022/12/hinh-nen-manchester-united.jpg' }
        // require('../../../assets/icon.png')
      }
      style={styles.productImage}
    />


    <View style={styles.btn}>
      <Button style={styles.nut} title='Quản Lý Cửa Hàng'
        onPress={() => nav.navigate('QuanLy')}
      />
      <Button style={styles.nut} title='Thông tin'
        onPress={() => nav.navigate('ThongTin')}
      />
    </View>
  </View>)
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='QuanLy' component={QuanLy} />
          <Stack.Screen
          name='Them' component={Them} /> 
        <Stack.Screen
          name='Home' component={Home} />
        <Stack.Screen
          name='ThongTin' component={ThongTin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 170,
    height: 100,
    marginLeft: 110,
    marginTop: 15,
    marginBottom: 15,


  },
  btn:{
   marginTop:10,
  //  flexDirection:'row',
   width:300,
   justifyContent:'center',
   padding:10,
   marginLeft:40,
  },
  nut:{
   marginLeft:20,
  }
});
export default App;
