import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox} from "react-native";
import {Provider} from "react-redux";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {persistor, store} from "./redux/store";

LogBox.ignoreAllLogs(true);

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NativeBaseProvider>
                        <SafeAreaProvider>
                            <Navigation colorScheme={colorScheme}/>
                            <StatusBar/>
                        </SafeAreaProvider>
                    </NativeBaseProvider>
                </PersistGate>
            </Provider>
        );
    }
}
