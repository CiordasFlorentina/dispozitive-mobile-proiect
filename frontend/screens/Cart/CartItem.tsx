import * as React from 'react'
import {StyleSheet, View} from "react-native";
import {Avatar, Text,} from "native-base";
import {AppProps, ShopItem} from "../../types";


const CartItem = (props: AppProps & { item: any }) => {
    const data: ShopItem = props.item.item;
    return (

        <View style={styles.listItem} key={Math.random()}>
            <Avatar bg="rgb(8, 145, 178)"

                    source={{uri: data.image} }
                >
            </Avatar>
            <Text style={[{flexGrow: 1}, styles.details]}>{data.name}</Text>
            <Text style={[{flexGrow: 0}, styles.details]}>$ {data.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 10,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        border: "1px solid white"
    },
    details: {
        fontWeight: "bold",
        paddingLeft: 5,
        paddingRight: 5
    }
})

export default CartItem;
