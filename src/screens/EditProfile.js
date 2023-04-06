import { View, Text, StatusBar, Dimensions, TextInput, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({ navigation }) => {
    const [existsData, setExistsData] = useState({})
    const [isUser, setIsUser] = useState(false)
    const [data, setData] = useState({
        name: '',
        city: '',
        number: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setExistsData(docSnap.data());
            } else {
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


    const updateData =  () => {
        setIsUser(true)
        const oldData = doc(db, "users", auth.currentUser.uid)
         updateDoc(oldData, {
            userName: data.name,
            userCity: data.city,
            userPhone: data.number
        }).then((res) => {
            setIsUser(true);
            setTimeout(() => {
                setIsUser(false);
            }, 2000)
            alert("update profile successfully!")
        }).catch((err) => {
            setIsUser(true);
            setTimeout(() => {
                setIsUser(false);
            }, 2000)
            alert("smothing Went Wrong!")
            console.log(err);
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/Basic.jpg")}
                style={{ height: 100, width: 100, }}
                imageStyle={styles.image}
            >
            </ImageBackground>
            <View style={{ padding: 10 }}></View>
            <StatusBar style="auto" />
            <Text style={{ fontSize: 18, fontWeight: '400', alignSelf: "center" }}>Name</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={existsData.userName}
                    placeholderTextColor="#003f5c"
                    onChangeText={text =>
                        onChangeData({ name: 'name', value: text })
                    }
                />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '400', alignSelf: "center" }}>City</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={existsData.userCity}
                    placeholderTextColor="#003f5c"
                    inputMode="text"
                    onChangeText={text =>
                        onChangeData({ name: 'city', value: text })
                    }
                />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '400', alignSelf: "center" }}>Phone Number</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={existsData.userPhone}
                    placeholderTextColor="#003f5c"
                    inputMode="tel"
                    onChangeText={text =>
                        onChangeData({ name: 'number', value: text })
                    }
                />
            </View>
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    if (data.name == '' && data.city == '' && data.number == '') {
                        alert("Fields are missings!")
                    } else {
                        updateData()
                    }
                }}
            >
                {isUser ?
                    <ActivityIndicator size={"large"} />
                    :
                    <Text style={{ color: '#ffffff' }}>{"Save Edit"}</Text>
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