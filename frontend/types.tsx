/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NotFound: undefined;
    ItemDetail: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList,
    Screen>;

export type RootTabParamList = {
    Home: undefined;
    Cart: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>>;

export type Props = {
    navigation: {
        navigate: Function;
    };
};

export type AppProps = {
    children?: React.ReactNode;
    childrenElement?: JSX.Element;
    style?: React.CSSProperties;
    onChange?: React.FormEventHandler<HTMLInputElement>;
    navigation?: {
        navigate: Function;
    };
    [key: string]: any;
}

export type Category = {
    id: string;
    name: string;
};

export type ShopItem = {
    price: number;
    name: string;
    countInStock: number;
    image: string;
    id: string;
    category: string;
    description: string;
    brand: string;
    cartId?: string;
};

export type CartItemType = {
    item: string;
    cartId?: string;
    quantity?: number;
};

export type DataStore = {
    cartItems: CartItemType[]
};

