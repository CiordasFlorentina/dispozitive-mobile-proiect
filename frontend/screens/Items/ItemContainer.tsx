import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, useToast} from "native-base";
import * as actions from "../../redux/Actions/cartActions";

let {width} = Dimensions.get("window");

const ItemContainer = (props: any) => {
    const {name, price, image, countInStock} = props;
    const toast = useToast();

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{uri: image} }
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name?.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
            </Text>
            <Text style={styles.price}>${price}</Text>

            {countInStock > 0 ? (
                <View style={{marginBottom: 60}}>
                    <Button
                        variant="solid"
                        style={{width: 100, height: 50, top: 10}}
                        onPress={() => {
                            toast.show({
                                title: `${name} added to Cart`,
                                description: "Go to your cart to complete order",
                                placement: 'bottom',
                            });
                            props.addToCart(props.id);
                        }}
                    >
                        <Text style={{color: "white"}}>Add</Text>
                    </Button>
                </View>
            ) : (
                <Text style={{marginTop: 20}}>Currently Unavailable</Text>
            )}
        </View>
    );
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        addToCart: (item: string) =>
            dispatch(actions.addToCart({quantity: 1, item})),
    };
};

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white",
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: "transparent",
        position: "absolute",
        top: -45,
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: "transparent",
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
    },
    price: {
        fontSize: 20,
        color: "orange",
        marginTop: 10,
    },
});

export default connect(null, mapDispatchToProps)(ItemContainer);