import { Text, View, Image, StyleSheet, Modal, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, } from "../firebase";
import { signOut } from "firebase/auth";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ }) => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.images}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("EditProfile")}}>
                        <Image style={styles.imageEdit} source={require("../../assets/edit.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {logOut()}}>
                        <Image style={styles.image} source={require("../../assets/logout.jpg")} />
                    </TouchableOpacity>
                </View>
            ),
        });
        const logOut = () => {
            signOut(auth).then(() => {

                navigation.navigate('Login')
            }).catch((err) => {
                console.log('----->', err);
            })
        }
    }, [navigation])


    return (
        <View>
            <Text>HOME</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    images: {
        marginRight: '4%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    image: {
        marginHorizontal: '2%',
        width: 40,
        height: 35,
    },
    imageEdit: {
        marginHorizontal: '4%',
        width: 40,
        height: 35,
    }


})

export default Home;