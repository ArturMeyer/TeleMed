import { Box, CheckIcon, HStack, Icon, Image, Pressable, ScrollView, Select, Text, useTheme, useToast, VStack } from 'native-base';
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
import { Envelope, IdentificationCard, Key, User } from 'phosphor-react-native';

export function Cadastro({ setCadastrar, setUser }) {

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [CPF, setCPF] = useState('');
    const [tipo, setTipo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [especialidade, setEspecialidade] = useState<'Ginecologia' | 'Clínica Médica' | 'Cardiologia' | 'Psiquiatria' | 'Endocrinologia' | 'Ortopedia' | 'Dermatologia' | 'Oftalmologia' | 'Anestesiologista' | 'Pediatria' | 'Neurologia'>();

    const navigation = useNavigation();
    const toast = useToast();

    const { colors } = useTheme();

    async function handleNewOrderRegister() {
        setIsLoading(true)
        await api.post(`api/User/cadastrar`, { nome, tipo, CPF, especialidade, senha, email })
            .then(async (response) => {
                console.log(response)
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="10" py="1" top={-40} rounded="8" mb={5}>
                            <Text color={'gray.100'}>Cadastro realizado com sucesso</Text>
                        </Box>;
                    }
                });
                setIsLoading(false)
                setCadastrar(false)
            })
            .catch(error => {
                Alert.alert(`${error}`);
                console.log(error)
                setIsLoading(false)
            })
    }

    return (
        <VStack flex={1} p={6} bg='gray.200'>
            <ScrollView>
                <Header goBack={() => setCadastrar(false)} title='Cadastro' />

                <Input
                    placeholder='Nome'
                    InputLeftElement={<Icon as={<User color={colors.primary[700]} />} ml={4} />}
                    shadow={"2"}
                    mb={4}
                    onChangeText={setNome}

                />

                <Input
                    placeholder='CPF'
                    InputLeftElement={<Icon as={<IdentificationCard color={colors.primary[700]} />} ml={4} />}
                    shadow={"2"}
                    mb={4}
                    onChangeText={setCPF}

                />

                <Input
                    placeholder='E-mail'
                    InputLeftElement={<Icon as={<Envelope color={colors.primary[700]} />} ml={4} />}
                    shadow={"2"}
                    mb={4}
                    onChangeText={setEmail}

                />

                <Input
                    placeholder='Senha'
                    mb={2}
                    InputLeftElement={<Icon as={<Key color={colors.primary[700]} />} ml={4} />}
                    secureTextEntry
                    shadow={"2"}
                    onChangeText={setSenha}
                />

                <Box >
                    <Select shadow={"2"} mb={2} h='60' roundead={8} fontSize={15} selectedValue={tipo} borderRadius={8} bgColor="gray.100" r accessibilityLabel="Tipo de usuário" placeholder="Tipo de usuário" _selectedItem={{
                        bg: "gray.100",
                        fontSize: 19,
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setTipo(itemValue)}>
                        <Select.Item label="Especialista" value="especialista" />
                        <Select.Item label="Estagiário" value="estagiario" />
                        <Select.Item label="Médico da UBS" value="medicoUBS" />
                    </Select>
                </Box>

                {
                    tipo === "especialista" || tipo === "estagiario"
                        ?
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
                        :
                        null
                }
                <Button
                    _loading={isLoading}
                    title='Cadastrar'
                    mt={5}
                    onPress={handleNewOrderRegister}
                    isLoading={isLoading}
                />
            </ScrollView>
        </VStack>

    );
}