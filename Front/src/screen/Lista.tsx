import React, { useEffect, useState } from 'react';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center, ScrollView, Button as Btn, Modal, Image, Circle, Pressable, AlertDialog, useToast, Box } from 'native-base';
import { ChatTeardropText, FunnelSimple, Plus, PlusCircle, Question, SignOut, User, UserList } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert, RefreshControl } from 'react-native';
import api from "../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Anestesiologia from '../assets/anestesiologia.png';
import Cardiologia from '../assets/cardiologia.png';
import ClinicaMedica from '../assets/clinicaMedica.png';
import Dermatologia from '../assets/dermatologia.png';
import Endocrinologia from '../assets/endocrinologia.png';
import Ginecologia from '../assets/ginecologia.png';
import Neurologia from '../assets/neurologia.png';
import Oftalmologia from '../assets/oftalmologia.png';
import Ortopedia from '../assets/ortopedia.png';
import Psiquiatria from '../assets/psiquiatria.png';
import Pediatria from '../assets/pediatria.png';
import { Loading } from '../components/Loading';
import { Header } from '../components/Header';
import { Order, OrderProps } from '../components/Order';

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export function Lista() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [orders, setOrders] = useState<OrderProps[]>([]);

    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem("User");
            setUser(data != null ? JSON.parse(data) : null);
            setIsLoading(false);
            return;
            console.log(user)
        } catch (e) {
            console.log(e)
        }
    }

    let imagem = null;

    const toast = useToast();

    async function getRespostas() {
        if(!user)
            await Promise.all(getData())
        console.log(user)

        setIsLoading(true);
        if (user && user.tipo !== 'medicoUBS') {
            await api.post(`api/Pergunta/respostas`, { id: user._id })
                .then(async (response) => {
                    console.log(response.data)
                    setOrders(response.data)
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setIsLoading(false);
                })
        } else if(user && user.tipo === 'medicoUBS') {
            await api.get(`api/Pergunta/userPerguntas/${user._id}`)
                .then(async (response) => {
                    console.log(response.data)
                    setOrders(response.data)
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setIsLoading(false);
                })

        }
        setIsLoading(false);

    }

    useEffect(() => {
        getRespostas()
    }, [refreshing, user])

    function handleOpenDetails(orderId: string) {

        navigation.navigate('details', { orderId });

    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1).then(() => setRefreshing(false));
    }, []);

    const { colors } = useTheme();

    const navigation = useNavigation();

    const [time, setTime] = useState();

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack
            flex={1}
            bg='gray.200'
            pb={5}
            px={5}
        >

            <Header title={user && user.tipo === 'medicoUBS' ? 'Minhas Perguntas' : 'Minhas Respostas'} />
            {
                isLoading
                    ?
                    <Loading />
                    :
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={orders}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) =>
                            <Order onPress={() => handleOpenDetails(item._id)} data={item} />
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        ListEmptyComponent={() => (
                            <Center>
                                <ChatTeardropText color={colors.gray[300]} size={40} />
                                <Text color={'black'} fontSize='xl' mt={6} textAlign='center'>
                                    Não foram encontradas {'\n'}
                                    {user && user.tipo === 'medicoUBS' ? 'perguntas' : 'respostas'}
                                </Text>
                            </Center>
                        )}
                    >


                    </FlatList>
            }

        </VStack >
    );
}