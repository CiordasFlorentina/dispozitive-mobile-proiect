import * as React from 'react'
import {Dimensions, TouchableOpacity, View} from 'react-native';
import ItemContainer from "./ItemContainer";
import {ShopItem} from "../../types";


let {width} = Dimensions.get("window");

const ItemsList = (props: { item: ShopItem; navigation: any }) => {

    const {item} = props;

    return (
        <TouchableOpacity
            style={{width: '50%'}}
            onPress={() => props.navigation.navigate('ItemDetail', {item: item.id})}
        >
            <View style={{
                width: width / 2,
                backgroundColor: 'gainsboro'
            }}>
                <ItemContainer {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default ItemsList;
