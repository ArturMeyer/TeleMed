import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screen/Home";
import { Details } from "../screen/Details";
import { Register } from "../screen/Register";
import { Lista } from "../screen/Lista";
import { Perfil } from "../screen/Perfil";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home} />
            <Screen name="new" component={Register} />
            <Screen name="details" component={Details} />
            <Screen name="lista" component={Lista} />
            <Screen name="perfil" component={Perfil} />
        </Navigator>
    )
}