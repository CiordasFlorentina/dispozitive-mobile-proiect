import {Image, ScrollView, StyleSheet} from 'react-native';
import {connect} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {Button, useToast} from "native-base";
import React, {useCallback, useState} from "react";
import {Text, View} from '../../components/Themed';
import * as actions from "../../redux/Actions/cartActions";
import {AppProps, ShopItem} from "../../types";
import baseURL from "../../assets/baseUrl";


const ItemDetails = (props: AppProps) => {
    const [item, setItem] = useState<ShopItem | null>();
    const [availability, setAvailability] = useState<any>(null);
    const toast = useToast();

    useFocusEffect(
        useCallback(() => {
            axios
                .get(`${baseURL}products/${props.route.params.item}`)
                .then((res) => {
                    setItem(res.data);
                    if (res.data?.countInStock == 0) {
                        setAvailability(<View style={styles.unavailable}><Text>Unavailable</Text></View>);
                    } else if (res.data?.countInStock && res.data.countInStock <= 5) {
                        setAvailability(<View style={styles.limited}><Text>Limited</Text></View>);
                    } else {
                        setAvailability(<View style={styles.available}><Text>Available</Text></View>);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });


            return () => {
                setAvailability(null);
                setItem(null);
            };
        }, []))

    return (
        item ? (
                <View style={styles.container}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                    <ScrollView style={{marginBottom: 80, padding: 5}}>
                        <View>
                            <Image
                                source={{uri: item.image}}
                                resizeMode="contain"
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>{item.brand}</Text>
                        </View>
                        <View style={styles.availabilityContainer}>
                            <View style={styles.availability}>
                                <Text> Availability: {availability} </Text>
                            </View>
                            <Text>{item.description}</Text>
                        </View>
                    </ScrollView>

                    <View style={styles.bottomContainer}>

                        <Text style={styles.price}>$ {item.price}</Text>

                        {item.countInStock === 0 ? (<View></View>) : (
                            <Button
                                variant="solid"
                                style={{width: 100, height: 50, alignSelf: "center"}}
                                onPress={() => {
                                    props.addItemToCart(item.id);
                                    toast.show({
                                        title: `${item.name} added to Cart`,
                                        description: "Go to your cart to complete order",
                                        placement: 'bottom',
                                    });
                                }}
                            >
                                <Text style={{color: "white"}}>Add</Text>
                            </Button>)}


                    </View>
                </View>
            ) :
            (<View></View>)
    );
}

const mapToDispatchToProps = (dispatch: Function) => {
    return {
        addItemToCart: (item: string) =>
            dispatch(actions.addToCart({quantity: 1, item})),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    imageContainer: {
        backgroundColor: "white",
        padding: 0,
        margin: 0,
    },
    image: {
        width: "100%",
        height: 250,
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    contentHeader: {
        fontWeight: "bold",
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        width: "100%",
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: "red",
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    availability: {
        flexDirection: "row",
        marginBottom: 10,
    },
    available: {
        backgroundColor: '#afec1a'
    },
    limited: {
        backgroundColor: '#ffe033'
    },
    unavailable: {
        backgroundColor: '#ec241a'
    }
});


export default connect(null, mapToDispatchToProps)(ItemDetails);