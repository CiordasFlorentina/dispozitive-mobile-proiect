import * as React from 'react'
import {Dimensions, StyleSheet, Text, View} from 'react-native'
import {Avatar, Container, HStack} from 'native-base';
import {ShopItem} from "../../types";

let {width} = Dimensions.get("window")

const SearchedItem = (props: { navigation: any; itemsFiltered: ShopItem[]; }) => {
    const {itemsFiltered} = props;

    return (
        <Container style={{width: width}}>
            {itemsFiltered.length > 0 ? (
                itemsFiltered.map((item: ShopItem) => (
                    <HStack justifyContent="center"
                            space={2}
                            key={Math.random()}
                            style={styles.center}
                    >
                        <Avatar bg="rgb(8, 145, 178)"
                                source={{uri: item.image} }
                        >
                        </Avatar>
                        <Text
                            onPress={() => props.navigation.navigate('ItemDetail', {item: item.id})}
                        >{item.name}</Text>
                    </HStack>
                ))
            ) : (
                <View style={styles.center}>
                    <Text> No items found</Text>
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingLeft: 10
    }
})

export default SearchedItem;
