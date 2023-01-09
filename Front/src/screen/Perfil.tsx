import React, { useEffect, useState } from 'react';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center, ScrollView, Button as Btn, Modal, Image, Circle, Pressable, AlertDialog, useToast, Box } from 'native-base';
import { ChatTeardropText, CircleWavyCheck, Envelope, FunnelSimple, GraduationCap, Hourglass, IdentificationBadge, IdentificationCard, Plus, PlusCircle, Question, SignOut, User, UserList } from 'phosphor-react-native';
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
import { CardDetails } from '../components/CardDetails';

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export function Perfil() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

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
        if (!user)
            await Promise.all(getData())
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
        >

            <Header title='Perfil' />

            <ScrollView
                mx={5}
                showsVerticalScrollIndicator={false}
            >

                <CardDetails
                    title='Nome'
                    description={`${user && user.nome}`}
                    icon={User}
                />

                <CardDetails
                    title='CPF'
                    description={`${user && user.CPF}`}
                    icon={IdentificationCard}
                />

                <CardDetails
                    title='E-mail'
                    description={`${user && user.email}`}
                    icon={Envelope}
                />

                <CardDetails
                    title='Tipo de usuário'
                    description={`${user && user.tipo === 'estagiario' ? "Estagiário(a)" : user && user.tipo === 'medicoUBS' ? 'Medico(a) da UBS' : user && user.tipo === 'especialista' ? "Médico(a) especialista" : ""}`}
                    icon={IdentificationBadge}
                />
                {
                    user && user.especialidade ?
                    <CardDetails
                        title='Especialidade'
                        description={`${user && user.especialidade}`}
                        icon={GraduationCap}
                    />
                    :
                    null
                }
            </ScrollView>

        </VStack>
    );
}