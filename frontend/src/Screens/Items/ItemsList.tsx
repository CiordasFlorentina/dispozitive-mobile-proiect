import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';


import ItemContainer from "./ItemContainer";

var { width } = Dimensions.get("window");

const ItemsList = (props: { item: any; navigation:any }) => {
    const { item } = props;
    return(
        <TouchableOpacity
            style={{ width: '50%' }}
        >
            <View style={{ width: width / 2,
                backgroundColor: 'gainsboro'}}
            >
                <ItemContainer {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default ItemsList;
