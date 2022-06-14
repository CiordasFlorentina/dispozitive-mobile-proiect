import * as React from 'react'
import {StyleSheet, View} from "react-native";
import {Badge, Text} from "native-base";

import {connect} from "react-redux";


const CartIconBadge = (props: any) => {
    return (
        <>
            {props.cartItems.length ? (
                <Badge style={[styles.badge, styles.withItems]}>
                    <Text style={styles.text} color={"white"} width={"100%"}>{props.cartItems.length}</Text>
                </Badge>
            ) : <View style={[styles.badge]}/>}
        </>
    );
};

const mapStateToProps = (state: { cartItems: any }) => {
    return state.cartItems;
};

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: 0,
        left: 15,
        borderRadius: 30,
        color: "white",
    },
    withItems:{
        backgroundColor: "rgb(8, 145, 178)",
        // backgroundColor: "red",
    },
    text: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

export default connect(mapStateToProps)(CartIconBadge);