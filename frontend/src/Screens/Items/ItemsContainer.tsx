import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {Container, Header, Icon, Input, Item, Text} from "native-base";

import Banner from "../../Shared/Banner";
import SearchedItem from "./searchedItem";
import ItemsList from "./ItemsList";
// import CategoryFilter from "./CategoryFilter";
// import baseURL from "../../assets/common/baseUrl";

var {height} = Dimensions.get('window')

const ItemsContainer = (props: any) => {
    const [items, setItems] = useState([]);
    const [itemsFiltered, setItemsFiltered] = useState([]);
    const [focus, setFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [itemsCtg, setItemsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setItems([]);
        return () => {
            setItems([]);
        }
    })

    // useFocusEffect((
    //     useCallback(
    //         () => {
    //             setFocus(false);
    //             setActive(-1);
    //
    //             //
    //             // axios
    //             //     .get(`${baseURL}products`)
    //             //     .then((res) => {
    //             //         setProducts(res.data);
    //             //         setProductsFiltered(res.data);
    //             //         setProductsCtg(res.data);
    //             //         setInitialState(res.data);
    //             //         setLoading(false)
    //             //     })
    //             //     .catch((error) => {
    //             //         console.log('Api call error')
    //             //     })
    //
    //             // Categories
    //             // axios
    //             //     .get(`${baseURL}categories`)
    //             //     .then((res) => {
    //             //         setCategories(res.data)
    //             //     })
    //             //     .catch((error) => {
    //             //         console.log('Api call error')
    //             //     })
    //
    //             return () => {
    //                 setItems([]);
    //                 setItemsFiltered([]);
    //                 setFocus();
    //                 setCategories([]);
    //                 setActive();
    //                 setInitialState();
    //             };
    //         },
    //         [],
    //     )
    // ))


    const searchItems = (text: string) => {
        setItemsFiltered(
            items.filter((item: any) => item.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    // // Categories
    // const changeCtg = (ctg) => {
    //     {
    //         ctg === "all"
    //             ? [setProductsCtg(initialState), setActive(true)]
    //             : [
    //                 setProductsCtg(
    //                     products.filter((i) => i.category._id === ctg),
    //                     setActive(true)
    //                 ),
    //             ];
    //     }
    // };

    return (
        <>
            {loading == false ? (
                <Container>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search"/>
                            <Input
                                placeholder="Search"
                                onFocus={openList}
                                onChangeText={(text) => searchItems(text)}
                            />
                            {focus == true ? <Icon onPress={onBlur} name="ios-close"/> : null}
                        </Item>
                    </Header>
                    {focus == true ? (
                        <SearchedItem
                            // navigation={props.navigation}
                            itemsFiltered={itemsFiltered}/>
                    ) : (
                        <ScrollView>
                            <View>
                                <View>
                                    <Banner/>
                                </View>
                                <View>
                                    {/*<CategoryFilter*/}
                                    {/*    categories={categories}*/}
                                    {/*    categoryFilter={changeCtg}*/}
                                    {/*    itemsCtg={itemsCtg}*/}
                                    {/*    active={active}*/}
                                    {/*    setActive={setActive}*/}
                                    {/*/>*/}
                                </View>
                                {itemsCtg.length > 0 ? (
                                    <View style={styles.listContainer}>
                                        {itemsCtg.map((item: any) => {
                                            return (
                                                <ItemsList
                                                    navigation={props.navigation}
                                                    key={item.name}
                                                    item={item}
                                                />
                                            )
                                        })}
                                    </View>
                                ) : (
                                    <View style={[styles.center, {height: height / 2}]}>
                                        <Text>No items found</Text>
                                    </View>
                                )}

                            </View>
                        </ScrollView>
                    )}
                </Container>
            ) : (
                // Loading
                <Container style={[styles.center, {backgroundColor: "#f2f2f2"}]}>
                    <ActivityIndicator size="large" color="red"/>
                </Container>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ItemsContainer;
