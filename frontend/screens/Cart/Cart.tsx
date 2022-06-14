import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {Button, Container, Text} from "native-base";
import {SwipeListView} from "react-native-swipe-list-view";
import {connect} from "react-redux";
import axios from "axios";
import * as actions from "../../redux/Actions/cartActions";
import {AppProps, CartItemType, ShopItem} from "../../types";
import baseURL from "../../assets/baseUrl";
import CartItem from "./CartItem";
import {FontAwesome} from "@expo/vector-icons";


let {height, width} = Dimensions.get("window");

export interface CartProps extends AppProps, DispatchProps {
    cartItems: CartItemType[]
}

export interface DispatchProps {
    removeFromCart: typeof actions.removeFromCart;
    clearCart: typeof actions.clearCart;
}

const Cart = (props: CartProps) => {
    const [cartItems, setCartItems] = useState<ShopItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>();

    useEffect(() => {
        getProducts();
        return () => {
            setCartItems([]);
            setTotalPrice(0);
        };
    }, [props]);

    const getProducts = () => {

        const items: ShopItem[] = [];
        let total = 0;
        props.cartItems.forEach((cart) => {
            axios
                .get(`${baseURL}products/${cart.item}`)
                .then((res) => {
                    items.push({...res.data, cartId: cart.cartId});
                    setCartItems(items);
                    total += res.data.price;

                    setTotalPrice(total);

                })
                .catch((e) => {
                    console.log(e);
                });
        });

    };

    return (
        <>
            {cartItems.length ? (
                <Container style={{width: "100%", maxWidth: "100%", display: "flex", height: "100%"}}>
                    <SwipeListView
                        key={Math.random()}
                        style={{width: "100%", paddingTop: 5}}
                        data={cartItems}
                        renderItem={(data: { item: ShopItem }) => (
                            <TouchableHighlight
                                style={styles.rowFront}
                            >
                                <CartItem item={data}/>
                            </TouchableHighlight>
                        )}
                        renderHiddenItem={(data: { item: ShopItem }) => (
                            <View style={styles.rowBack} key={`a-${Math.random()}`}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteBtn]}
                                    onPress={() => {
                                        props.removeFromCart(data.item.cartId);
                                    }}
                                >
                                    <FontAwesome size={15} style={{marginBottom: -3}} name="trash" color={"white"}/>
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={50}
                        stopLeftSwipe={50}
                        rightOpenValue={-55}
                    />

                    <View style={styles.bottomContainer}>
                        <Text style={styles.price}>$ {totalPrice}</Text>
                        <Button danger medium onPress={() => props.clearCart()}>
                            <Text style={{color: "white"}}>Clear</Text>
                        </Button>
                    </View>
                </Container>
            ) : (
                <Container style={styles.emptyContainer}>
                    <View style={{marginVertical: 80, marginHorizontal: "auto"}}>
                        <Text style={{textAlign: "center"}}>Looks like your cart is empty</Text>
                        <Text>Add products to your cart to get started</Text>
                    </View>

                </Container>
            )}
        </>
    );
};

const mapStateToProps = (state: { cartItems: CartItemType[] }) => {
    return state.cartItems;
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    } as DispatchProps;
};

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: "center",
        height: height,
        width: "100%",
        maxWidth: "100%",
    },
    bottomContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
        width: "100%",
        backgroundColor: "white",
        elevation: 20,
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: "red",
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    hiddenButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 25,
        height: 70,
        width: width / 1.2,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    list: {
        color: '#FFF',
    },
    btnText: {
        color: '#FFF',
    },
    rowFront: {
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
    },
    actionButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 50,
    },
    deleteBtn: {
        backgroundColor: 'red',
        right: 0,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
