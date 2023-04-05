import { View, Text, Image, StatusBar, Dimensions, TextInput, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc,getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({ navigation }) => {
    // const [existsData, setExistsData] = useState()
    const [isUser, setIsUser] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        city: '',
        number: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDocs(docRef);
            console.log('---->',auth.currentUser);
            if (docSnap.exists()) {
                setIsUser(true)
                console.log('------>', docSnap.data());
                // setData(docSnap.data().Full_name)
            } else {
                // setExistsData({
                //     name: auth.currentUser.displayName,
                //     email: auth.currentUser.email
                // })
                setIsUser(false)
                console.log('no_DATA');
            }
        }
        fetchData();
    }, [])

    const onChangeData = e => {
        setData({
            ...data,
            [e.name]: e.value,
        });
    };

    // const addData = async () => {
    //     const docData = await addDoc(collection(db, "users"), {
    //         userName: data.name,
    //         userEmial:data.email,
    //         userCity: data.city,
    //         userPhone: data.number
    //     })
    //     console.log('------>',docData);
    // }



    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/user.png")}
                style={{ height: 100, width: 100, }}
                imageStyle={styles.image}
            >
            </ImageBackground>
            <View style={{ padding: 10 }}></View>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={auth.currentUser.displayName}
                    placeholderTextColor="#003f5c"
                onChangeText={text =>
                    onChangeData({ name: 'name', value: !isUser? text:auth.currentUser.displayName })
                }
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={auth.currentUser.email}
                    placeholderTextColor="#003f5c"
                onChangeText={text =>
                    onChangeData({ name: 'email', value: !isUser ? text : auth.currentUser.email })
                } 
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="City"
                    placeholderTextColor="#003f5c"
                    inputMode="text"
                onChangeText={text =>
                    onChangeData({ name: 'city', value: text })
                }
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone number"
                    placeholderTextColor="#003f5c"
                    inputMode="tel"
                onChangeText={text =>
                    onChangeData({ name: 'number', value: text })
                }
                />
            </View>
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    addData()
                }
                }
            >
                <Text style={{ color: '#ffffff' }}>{isUser ? "Add":"Edit"}</Text>

            </TouchableOpacity>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",

    },
    image: {
        marginBottom: windowHeight * 0.2,
        borderRadius: 50,
        borderColor: "#000",
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

export default EditProfile;