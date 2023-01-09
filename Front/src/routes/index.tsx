import { NavigationContainer } from "@react-navigation/native";

import { SingIn } from "../screen/SingIn";
import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Cadastro } from "../screen/Cadastro";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Routes() {

    const [loading, setIsLoading] = useState(true);
    const [user, setUser] = useState<Object>()
    const [cadastrar, setCadastrar] = useState(false);

    async function getUser() {
        await AsyncStorage.getItem("User").then((u: any) => {
            setUser(JSON.parse(u))
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getUser();
        setUser(user)
    }, [user])

    if (loading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : cadastrar ? <Cadastro setUser={setUser} setCadastrar={setCadastrar}/> : <SingIn setUser={setUser} setCadastrar={setCadastrar} />}
        </NavigationContainer>
    )
}