import { Box, HStack, Image, Pressable, ScrollView, Text, useToast, VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../components/Button';

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

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { Filter } from '../components/Filter';
import api from '../services/API';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Register() {

    const [isLoading, setIsLoading] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');

    const [especialidade, setEspecialidade] = useState<'Ginecologia' | 'Clínica Médica' | 'Cardiologia' | 'Psiquiatria' | 'Endocrinologia' | 'Ortopedia' | 'Dermatologia' | 'Oftalmologia' | 'Anestesiologista' | 'Pediatria' | 'Neurologia'>("Anestesiologista");
    const [urgencia, setUrgencia] = useState<'emergencia' | 'muitoUrgente' | 'urgente' | 'poucoUrgente' | 'naoUrgente'>('emergencia');


    const navigation = useNavigation();
    const toast = useToast();

    async function handleNewOrderRegister() {

        let user = null;
        await AsyncStorage.getItem("User").then((u: any) => {
            user = JSON.parse(u)
        })
        let fator = 0;
        if (urgencia === 'emergencia')
            fator = 10
        else if (urgencia === 'muitoUrgente') {
            fator = 8
        } else if (urgencia === 'urgente') {
            fator = 6
        } else if (urgencia === 'poucoUrgente') {
            fator = 4
        }else if (urgencia === 'naoUrgente') {
            fator = 2
        }
        
        console.log("User" + user._id)
        await api.post(`api/Pergunta/cadastrar`, { titulo, resumo, especialidade, urgencia, data: new Date(), user: user._id, fator})
            .then(async (response) => {
                console.log(response)
                setIsLoading(false)
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="10" py="1" top={-40} rounded="8" mb={5}>
                            <Text color={'gray.100'}>Pergunta cadastrada com sucesso</Text>
                        </Box>;
                    }
                });
                navigation.navigate("home")
            })
            .catch(error => {
                Alert.alert(`${error}`);
                console.log(error)
                setIsLoading(false)
            })
    }

    return (
        <VStack flex={1} p={6} bg='gray.200'>

            <Header title='Nova pergunta' />

            <HStack>
                <ScrollView horizontal={true} flexWrap={'wrap'}>
                    <Pressable my={2} w='98' onPress={() => setEspecialidade('Anestesiologista')} opacity={especialidade === 'Anestesiologista' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Anestesiologia} alt="especialidade" />
                        <Text>Anestesiologia</Text>
                    </Pressable>
                    <Pressable my={2} w='98' onPress={() => setEspecialidade('Clínica Médica')} opacity={especialidade === 'Clínica Médica' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={ClinicaMedica} alt="especialidade" />
                        <Text>Clínica Médica</Text>
                    </Pressable>
                    <Pressable my={2} w='98' onPress={() => setEspecialidade('Cardiologia')} opacity={especialidade === 'Cardiologia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Cardiologia} alt="especialidade" />
                        <Text>Cardiologia</Text>
                    </Pressable>
                    <Pressable my={2} onPress={() => setEspecialidade('Pediatria')} w='98' opacity={especialidade === 'Pediatria' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Pediatria} alt="especialidade" />
                        <Text>Pediatria</Text>
                    </Pressable>
                    <Pressable my={2} onPress={() => setEspecialidade('Dermatologia')} w='98' opacity={especialidade === 'Dermatologia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Dermatologia} alt="especialidade" />
                        <Text>Dermatologia</Text>
                    </Pressable>
                    <Pressable my={2} onPress={() => setEspecialidade('Endocrinologia')} w='98' opacity={especialidade === 'Endocrinologia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Endocrinologia} alt="especialidade" />
                        <Text>Endocrinologia</Text>
                    </Pressable>
                    <Pressable my={2} onPress={() => setEspecialidade('Ginecologia')} w='98' opacity={especialidade === 'Ginecologia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Ginecologia} alt="especialidade" />
                        <Text>Ginecologia</Text>
                    </Pressable>
                    <Pressable my={2} w='98' onPress={() => setEspecialidade('Neurologia')} opacity={especialidade === 'Neurologia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Neurologia} alt="especialidade" />
                        <Text>Neurologia</Text>
                    </Pressable>
                    <Pressable my={2} onPress={() => setEspecialidade('Oftalmologia')} w='98' opacity={especialidade === 'Oftalmologia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Oftalmologia} alt="especialidade" />
                        <Text>Oftalmologia</Text>
                    </Pressable>
                    <Pressable my={2} onPress={() => setEspecialidade('Ortopedia')} w='98' opacity={especialidade === 'Ortopedia' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Ortopedia} alt="especialidade" />
                        <Text>Ortopedia</Text>
                    </Pressable>
                    <Pressable onPress={() => setEspecialidade('Psiquiatria')} my={2} w='98' opacity={especialidade === 'Psiquiatria' ? 1 : 0.3} alignItems={'center'} justifyContent={'center'}>
                        <Image size={16} source={Psiquiatria} alt="especialidade" />
                        <Text>Psiquiatria</Text>
                    </Pressable>
                </ScrollView>
            </HStack>


            <HStack justifyContent="center" flexWrap={'wrap'}>
                <ScrollView horizontal={true}>
                    <Filter
                        type='closed'
                        title='Emergência'
                        bgColorActive='red.700'
                        onPress={() => setUrgencia('emergencia')}
                        isActive={urgencia === 'emergencia'}
                    />
                    <Filter
                        type='closed'
                        title='Muito urgente'
                        bgColorActive='orange.600'
                        onPress={() => setUrgencia('muitoUrgente')}
                        isActive={urgencia === 'muitoUrgente'}
                    />
                    <Filter
                        type='closed'
                        title='Urgente'
                        bgColorActive='yellow.500'
                        onPress={() => setUrgencia('urgente')}
                        isActive={urgencia === 'urgente'}
                    />
                    <Filter
                        type='closed'
                        title='Pouco urgente'
                        bgColorActive='green.600'
                        onPress={() => setUrgencia('poucoUrgente')}
                        isActive={urgencia === 'poucoUrgente'}
                    />
                    <Filter
                        type='closed'
                        title='Não urgente'
                        bgColorActive='blue.600'
                        onPress={() => setUrgencia('naoUrgente')}
                        isActive={urgencia === 'naoUrgente'}
                    />
                </ScrollView>
            </HStack>

            <Input
                placeholder='Título'
                mt={4}
                onChangeText={setTitulo}
            />

            <Input
                placeholder='Descrição do problema'
                mt={5}
                minH={100}
                flex={1}
                multiline
                textAlignVertical='top'
                onChangeText={setResumo}
            />

            <Button
                _loading={isLoading}
                title='Cadastrar'
                mt={5}
                onPress={handleNewOrderRegister}
                isLoading={isLoading}
            />
        </VStack>

    );
}