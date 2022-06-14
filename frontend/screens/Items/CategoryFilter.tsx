import * as React from "react";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Badge, Text} from "native-base";
import {AppProps, Category} from "../../types";

const CategoryFilter = (props: AppProps) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={styles.scroll}
        >
            <TouchableOpacity
                key={1}
                onPress={() => {
                    props.categoryFilter("all");
                    props.setActive(-1);
                }}
            >
                <Badge
                    style={[
                        styles.center,
                        {margin: 5},
                        props.active == -1 ? styles.active : styles.inactive,
                    ]}
                >
                    <Text style={{color: "white"}}>All</Text>
                </Badge>
            </TouchableOpacity>

            {props.categories.map((item: Category) => (
                <TouchableOpacity
                    key={Math.random()}
                    onPress={() => {
                        props.categoryFilter(item.id);
                        props.setActive(props.categories.indexOf(item));
                    }}
                >
                    <Badge
                        style={[
                            styles.center,
                            {margin: 5},
                            props.active == props.categories.indexOf(item)
                                ? styles.active
                                : styles.inactive,
                        ]}
                    >
                        <Text style={{color: "white"}}>{item.name}</Text>
                    </Badge>
                </TouchableOpacity>
            ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: '#03bafc'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    },
    scroll: {
        backgroundColor: "#f2f2f2",
        maxWidth: "100%",
        height: 40
    }
})

export default CategoryFilter;