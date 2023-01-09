import React, { useEffect, useState } from 'react';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center, ScrollView, Button as Btn, Modal, Image, Circle, Pressable, AlertDialog, useToast, Box } from 'native-base';
import { ChatTeardropText, FunnelSimple, Plus, PlusCircle, Question, SignOut, User, UserList } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert, RefreshControl } from 'react-native';
import api from "../services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

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


const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export function Home() {

    const [urgencia, setUrgencia] = useState<['emergencia' | 'muitoUrgente' | 'urgente' | 'poucoUrgente' | 'naoUrgente']>(['emergencia', 'muitoUrgente', 'urgente', 'poucoUrgente', 'naoUrgente']);
    const [especialidade, setEspecialidade] = useState<['Ginecologia' | 'Clínica Médica' | 'Cardiologia' | 'Psiquiatria' | 'Endocrinologia' | 'Ortopedia' | 'Dermatologia' | 'Oftalmologia' | 'Anestesiologista' | 'Pediatria' | 'Neurologia']>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState<OrderProps[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [click, setClick] = useState(false);

    const { colors } = useTheme();

    const navigation = useNavigation();
    const toast = useToast();

    const [refreshing, setRefreshing] = useState(false);

    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem("User");
            await setUser(data != null ? JSON.parse(data) : null);
            if (JSON.parse(data).tipo === 'medicoUBS') {
                setEspecialidade(['Ginecologia', 'Clínica Médica', 'Cardiologia', 'Psiquiatria', 'Endocrinologia', 'Ortopedia', 'Dermatologia', 'Oftalmologia', 'Anestesiologista', 'Pediatria', 'Neurologia'])
            }else{
                setEspecialidade([])
                especialidade.push(JSON.parse(data).especialidade);
                setEspecialidade(especialidade)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1).then(() => setRefreshing(false));
    }, []);

    function handleNewOrder() {

        navigation.navigate('new');

    }

    function handleOpenDetails(orderId: string) {

        navigation.navigate('details', { orderId });

    }

    function handleLogOut() {
        AsyncStorage.removeItem("User")
        console.log("apertou")
    }

    function activeUrgencia(nome: 'emergencia' | 'muitoUrgente' | 'urgente' | 'poucoUrgente' | 'naoUrgente') {
        let aux = urgencia;
        if (urgencia.find(e => e === nome)) {
            aux.splice(aux.indexOf(nome), 1);
            setUrgencia(aux);
        } else {
            aux.push(nome);
            setUrgencia(aux);
        }

        setClick(true)

    }

    function findUrgencia(nome: 'emergencia' | 'muitoUrgente' | 'urgente' | 'poucoUrgente' | 'naoUrgente') {
        let e = urgencia.find(e => { return e === nome }) !== undefined
        if (click === true)
            setClick(false);
        return e;
    }

    function activeEspecialidade(nome: 'Ginecologia' | 'Clínica Médica' | 'Cardiologia' | 'Psiquiatria' | 'Endocrinologia' | 'Ortopedia' | 'Dermatologia' | 'Oftalmologia' | 'Anestesiologista' | 'Pediatria' | 'Neurologia') {
        let aux = especialidade;
        if (especialidade.find(e => e === nome)) {
            aux.splice(aux.indexOf(nome), 1);
            setEspecialidade(aux);
        } else {
            aux.push(nome);
            setEspecialidade(aux);
        }

        setClick(true)
    }

    function findEspecialidade(nome: 'Ginecologia' | 'Clínica Médica' | 'Cardiologia' | 'Psiquiatria' | 'Endocrinologia' | 'Ortopedia' | 'Dermatologia' | 'Oftalmologia' | 'Anestesiologista' | 'Pediatria' | 'Neurologia') {
        let e = especialidade.find(e => { return e === nome }) !== undefined
        if (click === true)
            setClick(false);
        return e;
    }

    async function getPerguntas() {

        if (!user)
            await Promise.all(getData())

        setIsLoading(true);
        await api.get(`api/Pergunta/all`)
            .then(async (response) => {
                setOrders(response.data)
                setIsLoading(false);
                if (user && user.tipo !== 'medicoUBS') {

                }
            })
            .catch(error => {
                console.log(error)
                toast.show({
                    render: () => {
                        return <Box alignItems={'center'} bg="red.500" px="10" py="1" top={-40} rounded="8" mb={5}>
                            <Text textAlign={'center'} color={'gray.100'}>Não foi possível {'\n'} carregar as perguntas</Text>
                        </Box>;
                    }
                });
                setIsLoading(false);
            })

    }

    useEffect(() => {
        getPerguntas();


    }, [urgencia, refreshing, especialidade, user])

    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    return (
        <VStack flex={1} pb={6} bg='gray.100'>
            <HStack
                w='full'
                justifyContent={'space-between'}
                alignItems="center"
                bg='gray.100'
                pt={12}
                pb={5}
                px={6}
            >

                <Heading color={'secondary.700'} fontSize={20}>
                    Tele<Text color={'primary.700'}>Med</Text>
                </Heading>

                <HStack>
                    <IconButton
                        icon={<FunnelSimple size={26} color={colors.primary[700]} />}
                        onPress={() => setShowModal(true)}

                    />

                    <IconButton
                        icon={<SignOut size={26} color={colors.primary[700]} />}
                        onPress={() => setIsOpen(!isOpen)}
                        bgColor={"gray.100"}
                    />
                </HStack>

            </HStack>

            <VStack flex={1} px={6}>
                <HStack
                    w={'full'}
                    mx={1}
                >
                    {
                        //<Text color={'primary.700'}>
                        //{orders.length} Perguntas
                        //</Text>
                    }

                </HStack>


                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content bgColor={'gray.100'} w='90%'>
                        <Modal.CloseButton />
                        <Modal.Header bgColor={'gray.100'} borderBottomColor={'gray.100'}>Filtros</Modal.Header>
                        <Modal.Body>
                            <Modal.Header bgColor={'gray.100'} borderBottomColor={'gray.100'}>Urgência</Modal.Header>
                            <HStack justifyContent="center" flexWrap={'wrap'}>
                                <Filter
                                    type='closed'
                                    title='Emergência'
                                    bgColorActive='red.700'
                                    onPress={() => activeUrgencia('emergencia')}
                                    isActive={findUrgencia('emergencia')}
                                />
                                <Filter
                                    type='closed'
                                    title='Muito urgente'
                                    bgColorActive='orange.600'
                                    onPress={() => activeUrgencia('muitoUrgente')}
                                    isActive={findUrgencia('muitoUrgente')}
                                />
                                <Filter
                                    type='closed'
                                    title='Urgente'
                                    bgColorActive='yellow.500'
                                    onPress={() => activeUrgencia('urgente')}
                                    isActive={findUrgencia('urgente')}
                                />
                                <Filter
                                    type='closed'
                                    title='Pouco urgente'
                                    bgColorActive='green.600'
                                    onPress={() => activeUrgencia('poucoUrgente')}
                                    isActive={findUrgencia('poucoUrgente')}
                                />
                                <Filter
                                    type='closed'
                                    title='Não urgente'
                                    bgColorActive='blue.600'
                                    onPress={() => activeUrgencia('naoUrgente')}
                                    isActive={findUrgencia('naoUrgente')}
                                />
                            </HStack>
                            <Modal.Header bgColor={'gray.100'} borderBottomColor={'gray.100'}>Especialidade</Modal.Header>

                            <HStack space={1} justifyContent="center" flexWrap={'wrap'}>
                                <Pressable my={2} w='98' onPress={() => activeEspecialidade('Anestesiologista')} opacity={findEspecialidade('Anestesiologista') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Anestesiologia} alt="especialidade" />
                                    <Text>Anestesiologia</Text>
                                </Pressable>
                                <Pressable my={2} w='98' onPress={() => activeEspecialidade('Clínica Médica')} opacity={findEspecialidade('Clínica Médica') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={ClinicaMedica} alt="especialidade" />
                                    <Text>Clínica Médica</Text>
                                </Pressable>
                                <Pressable my={2} w='98' onPress={() => activeEspecialidade('Cardiologia')} opacity={findEspecialidade('Cardiologia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Cardiologia} alt="especialidade" />
                                    <Text>Cardiologia</Text>
                                </Pressable>
                                <Pressable my={2} onPress={() => activeEspecialidade('Pediatria')} w='98' opacity={findEspecialidade('Pediatria') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Pediatria} alt="especialidade" />
                                    <Text>Pediatria</Text>
                                </Pressable>
                                <Pressable my={2} onPress={() => activeEspecialidade('Dermatologia')} w='98' opacity={findEspecialidade('Dermatologia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Dermatologia} alt="especialidade" />
                                    <Text>Dermatologia</Text>
                                </Pressable>
                                <Pressable my={2} onPress={() => activeEspecialidade('Endocrinologia')} w='98' opacity={findEspecialidade('Endocrinologia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Endocrinologia} alt="especialidade" />
                                    <Text>Endocrinologia</Text>
                                </Pressable>
                                <Pressable my={2} onPress={() => activeEspecialidade('Ginecologia')} w='98' opacity={findEspecialidade('Ginecologia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Ginecologia} alt="especialidade" />
                                    <Text>Ginecologia</Text>
                                </Pressable>
                                <Pressable my={2} w='98' onPress={() => activeEspecialidade('Neurologia')} opacity={findEspecialidade('Neurologia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Neurologia} alt="especialidade" />
                                    <Text>Neurologia</Text>
                                </Pressable>
                                <Pressable my={2} onPress={() => activeEspecialidade('Oftalmologia')} w='98' opacity={findEspecialidade('Oftalmologia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Oftalmologia} alt="especialidade" />
                                    <Text>Oftalmologia</Text>
                                </Pressable>
                                <Pressable my={2} onPress={() => activeEspecialidade('Ortopedia')} w='98' opacity={findEspecialidade('Ortopedia') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Ortopedia} alt="especialidade" />
                                    <Text>Ortopedia</Text>
                                </Pressable>
                                <Pressable onPress={() => activeEspecialidade('Psiquiatria')} my={2} w='98' opacity={findEspecialidade('Psiquiatria') ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                                    <Image size={16} source={Psiquiatria} alt="especialidade" />
                                    <Text>Psiquiatria</Text>
                                </Pressable>
                            </HStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
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
                                (item.urgencia === 'emergencia' && findUrgencia('emergencia') ||
                                    item.urgencia === 'muitoUrgente' && findUrgencia('muitoUrgente') ||
                                    item.urgencia === 'urgente' && findUrgencia('urgente') ||
                                    item.urgencia === 'naoUrgente' && findUrgencia('naoUrgente') ||
                                    item.urgencia === 'poucoUrgente' && findUrgencia('poucoUrgente')) &&
                                    (item.especialidade === 'Anestesiologista' && findEspecialidade('Anestesiologista') ||
                                        item.especialidade === 'Pediatria' && findEspecialidade('Pediatria') ||
                                        item.especialidade === 'Clínica Médica' && findEspecialidade('Clínica Médica') ||
                                        item.especialidade === 'Cardiologia' && findEspecialidade('Cardiologia') ||
                                        item.especialidade === 'Dermatologia' && findEspecialidade('Dermatologia') ||
                                        item.especialidade === 'Endocrinologia' && findEspecialidade('Endocrinologia') ||
                                        item.especialidade === 'Ginecologia' && findEspecialidade('Ginecologia') ||
                                        item.especialidade === 'Neurologia' && findEspecialidade('Neurologia') ||
                                        item.especialidade === 'Ortopedia' && findEspecialidade('Ortopedia') ||
                                        item.especialidade === 'Oftalmologia' && findEspecialidade('Oftalmologia') ||
                                        item.especialidade === 'Psiquiatria' && findEspecialidade('Psiquiatria')) ?
                                    <Order onPress={() => handleOpenDetails(item._id)} data={item} />
                                    :
                                    null
                            }
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            ListEmptyComponent={() => (
                                <Center>
                                    <ChatTeardropText color={colors.gray[300]} size={40} />
                                    <Text color={'black'} fontSize='xl' mt={6} textAlign='center'>
                                        Não foram encontradas {'\n'}
                                        perguntas
                                    </Text>
                                </Center>
                            )}
                        >


                        </FlatList>
                }
                <Center
                    flexDirection={'row'}
                    rounded={'3xl'}
                    justifyContent={'space-around'}
                    bgColor={"primary.700"}
                >

                    <IconButton
                        rounded={'70'}
                        h='70'
                        w='70'
                        icon={<User size={30} color={colors.gray[100]} />}
                        onPress={() => navigation.navigate("perfil")}
                    />

                    {
                        user && user.tipo === 'medicoUBS' ?
                            <IconButton
                                bgColor={"primary.700"}
                                rounded={'70'}
                                h='70'
                                w='70'
                                icon={<Plus size={30} color={colors.gray[100]} />}
                                onPress={handleNewOrder}
                            />
                            : null
                    }

                    <IconButton
                        rounded={'70'}
                        h='70'
                        w='70'
                        icon={<UserList size={32} color={colors.gray[100]} />}
                        onPress={() => navigation.navigate("lista")}
                    />
                </Center>

            </VStack>

            <Center>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Sair da conta</AlertDialog.Header>
                        <AlertDialog.Body>
                            Tem certeza que deseja sair?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Btn.Group space={2}>
                                <Btn variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                    Cancel
                                </Btn>
                                <Btn colorScheme="danger" w='100px' h='35px' onPress={handleLogOut}>
                                    Sair
                                </Btn>
                            </Btn.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </Center>

        </VStack>
    );
}