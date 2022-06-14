import React, {useCallback, useState} from "react";
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet,} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {FontAwesome} from "@expo/vector-icons";
import {Center, Container, Input, VStack, Text} from "native-base";
import {View} from '../../components/Themed';
import CategoryFilter from "./CategoryFilter";
import ItemsList from "./ItemsList";
import SearchedItem from "./SearchedItem";
import {AppProps, Category, ShopItem} from "../../types";
import baseURL from "../../assets/baseUrl";


let {height, width} = Dimensions.get("window");

const ItemsContainer = (props: AppProps) => {
    const [items, setItems] = useState<ShopItem[]>([]);
    const [searchedItems, setSearchedItems] = useState<ShopItem[]>([]);
    const [focus, setFocus] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredByCtgItems, setFilteredByCtgItems] = useState<ShopItem[]>([]);
    const [active, setActive] = useState<number>();
    const [initialState, setInitialState] = useState<ShopItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            setFocus(false);
            setActive(-1);
            setLoading(true);

            axios.get<ShopItem[]>(`${baseURL}products`)
                .then((res) => {
                    setItems(res.data);
                    setFilteredByCtgItems(res.data);
                    setInitialState(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios.get<Category[]>(`${baseURL}categories`)
                .then((res) => {
                    setCategories(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            return () => {
                setItems([]);
                setSearchedItems([]);
                setFocus(false);
                setCategories([]);
                setFilteredByCtgItems([]);
                setActive(-1);
                setInitialState([]);
                setLoading(false);
            };
        }, [])
    );

    const searchItems = (text: string) => {
        if (text && text.length > 1) {
            setSearchedItems(
                items.filter((item: any) =>
                    item.name.toLowerCase().includes(text.toLowerCase())
                )
            );
            openList();
        } else {
            setSearchedItems([]);
            setFocus(false);
        }

    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const categoryFilterChange = (ctg: string) => {
        if (ctg === "all") {
            setFilteredByCtgItems(initialState);
            setActive(-1);
        } else {
            setFilteredByCtgItems(items.filter((i) => i.category === ctg));
        }
    };

    return (
        <>
            {!loading ? (
                <Container style={styles.container}>
                    <Center style={styles.searchContainer}>
                        <VStack width="100%" space={2}>
                            <Input
                                placeholder="Search for products" bg="#fff" width="100%" borderRadius={4} py={3}
                                px={1} fontSize={14} backgroundColor={"rgba(236, 236, 236, 0.8)"}
                                onChangeText={(text) => searchItems(text)}
                                InputLeftElement={
                                    <View style={{backgroundColor: "inherit", margin: 5}}>
                                        <FontAwesome size={15}
                                                     name="search"
                                                     style={styles.searchIcon}/>
                                    </View>
                                }
                                InputRightElement={
                                    (focus ?
                                        <View style={{backgroundColor: "inherit", margin: 5}}>
                                            <FontAwesome
                                                size={15}
                                                style={styles.searchIcon}
                                                name="close"
                                                onPress={onBlur}/>
                                        </View>
                                        : undefined)
                                }/>
                        </VStack>
                    </Center>
                    {
                        focus ? (
                            <SearchedItem
                                navigation={props.navigation}
                                itemsFiltered={searchedItems}
                            />
                        ) : (
                            <ScrollView style={{width: "100%"}}>
                                <CategoryFilter
                                    categories={categories}
                                    categoryFilter={categoryFilterChange}
                                    active={active}
                                    setActive={setActive}
                                    style={{width: "100%", display: "flex", flex: 1}}
                                >
                                </CategoryFilter>

                                <View style={{width: "100%"}}>
                                    <View>
                                        {filteredByCtgItems.length > 0 ? (
                                            <View style={styles.listContainer}>
                                                {filteredByCtgItems.map((item: any) => {
                                                    return (
                                                        <ItemsList
                                                            navigation={props.navigation}
                                                            key={Math.random()}
                                                            item={item}
                                                        />
                                                    );
                                                })}
                                            </View>
                                        ) : (
                                            <View style={[styles.center, {height: height / 2,  backgroundColor: "#f2f2f2"}]}>
                                                <Text>No items in this category</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </ScrollView>

                        )
                    }
                </Container>
            ) : (
                <Container style={[styles.center, {
                    backgroundColor: "#f2f2f2",
                    height: "80%",
                    width: width,
                    maxWidth: "100%"
                }]}>
                    <ActivityIndicator size="large" color="rgb(8, 145, 178)"/>
                </Container>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        width: "100%",
        maxWidth: "100%"
    },
    searchContainer: {
        width: "100%"
    },
    searchIcon: {
        color: "#565656"
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        paddingBottom: 40,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ItemsContainer;
