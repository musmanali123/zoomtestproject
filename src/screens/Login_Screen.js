import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, View, ActivityIndicator, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { auth, } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {

  const [load, setLoad] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    })
  }, [])

  const onChangeData = e => {
    setData({
      ...data,
      [e.name]: e.value,
    });
  };

  const login = () => {
    setLoad(true)
    signInWithEmailAndPassword(auth, data.email, data.password).
      then((userCredential) => {
        const user = userCredential.user;
        setLoad(true)
        setTimeout(() => {
          setLoad(false)

        }, 2500)
        navigation.navigate("Home")
      }).catch((error) => {
        setLoad(true)
        setTimeout(() => {
          setLoad(false)
        }, 2500)
        alert(error.message)
      });
  }



  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/image.jpg")} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={text => onChangeData({ name: 'email', value: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={text => onChangeData({ name: "password", value: text })}
        />
      </View>
      <TouchableOpacity style={styles.register}>
        <Text style={styles.forgot_button}>Don't have Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signup}>Signup Here</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (data.email == '' && data.password == '') {
            alert("Email or password Is minssing")
          }else{
            login()
          }
        }}
        style={styles.loginBtn}>
        {load ?
          <ActivityIndicator size={'large'} /> :

          <Text style={{ color: '#ffffff' }}>LOGIN</Text>
        }
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#d0e1f9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  signup: {
    color: '#708090',
    height: 30,
    marginLeft: 6,
    marginBottom: 30,
  },
  loginBtn: {
    width: windowHeight * 0.17,
    borderRadius: 25,
    height: windowWidth * 0.12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowHeight * 0.01,
    backgroundColor: "#36454f",
  },

  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
export default LoginScreen;