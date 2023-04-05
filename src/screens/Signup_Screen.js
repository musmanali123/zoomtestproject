import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TextInput, StyleSheet, View, ActivityIndicator, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const SignupScreen = ({  }) => {
    const navigation = useNavigation()
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChangeData = e => {
        setData({
            ...data,
            [e.name]: e.value,
        });
    };


    const register = async () => {
        setLoad(true)
        createUserWithEmailAndPassword(auth, data.email, data.password,)
        .then((userCredential) => {
           const  user = userCredential.user;
           console.log('--->user',user);
            if (user.uid) {
                const docRef = addDoc(collection(db, 'users'), {
                    Full_name: data.name,
                    Email_user: data.email,
                    city: '',
                    phone_number: ''
                });
                setLoad(false);
                alert("User Creates Successfully!")
                navigation.navigate('Login');
            }    
        })
        .catch((error) => {
            console.log('error --->',error);
            alert("Something Went Wrong!")
            setLoad(false)
        });        
        
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/download.png")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Full Name."
                    placeholderTextColor="#003f5c"
                    onChangeText={text =>
                        onChangeData({ name: 'name', value: text })
                    }
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text =>
                        onChangeData({ name: 'email', value: text })
                    } />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password Here"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={text =>
                        onChangeData({ name: 'password', value: text })
                    }
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={text =>
                        onChangeData({ name: 'confirmPassword', value: text })
                    }
                />
            </View>
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    if (data.password != data.confirmPassword) {
                        alert("Password is not match!")
                    }
                    else {
                        register();
                    }
                }
                }
            >
                {load ?
                    <ActivityIndicator color={""} size={'large'} />
                    :
                    <Text style={{ color: '#ffffff' }}>Register</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: windowHeight * 0.01,
    },
    inputView: {
        backgroundColor: "#d0e1f9",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "flex-start",
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

export default SignupScreen;