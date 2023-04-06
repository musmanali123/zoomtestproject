import { Text, View, Image, StyleSheet, Modal, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native"
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, } from "../firebase";
import { signOut } from "firebase/auth";
import { FlatList } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const meetigns = [
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },

    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
    {
        name: 'Test1',
        Date: '12-Am',
        incoming: '1'
    },
]

const Home = ({ }) => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.images}>
                    <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }}>
                        <Image style={styles.imageEdit} source={require("../../assets/edit.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { logOut() }}>
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
    <>
        <Text style={{ 
            fontSize:18,
            fontWeight:'800',
            marginLeft:10,
            padding:10,
            alignItems: 'flex-start' }}>Meetings List</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
            <FlatList
            showsVerticalScrollIndicator={false}
                data={meetigns}
                renderItem={(item) => {
                    return (
                        <View style={{
                            backgroundColor: '#68a0cf',
                            overflow: 'hidden',
                            borderRadius: 10,
                            borderWidth: 1,
                            opacity:0.7,
                            borderWidth:1,
                            padding: 5,
                            margin: 10,
                            width: windowWidth * 0.75,
                            height: windowWidth * 0.24,
                        }}>
                            <Image style={{ width: 50,resizeMode:'cover', height: 50, borderRadius: 45, overflow: 'hidden', alignSelf: "center" }} source={require("../../assets/Basic.jpg")} />
                            <View style={{
                                marginTop: 8,
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexDirection: 'row'

                            }}>
                                <Text style={{ fontSize: 15, fontStyle: 'normal', fontWeight: '500', color: "#000" }}>{item.item.name} called you At {item.item.Date}</Text>
                                <Text >{item.item.incoming + Math.floor(Math.random() * (5 - 1 + 1))}-times</Text>

                            </View>
                        </View>
                    )
                }}
            />
        </View>
    </>
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