import { Center, Spinner } from "native-base";

export function Loading(){
    return(
        <Center flex={1} bg='gray.100'>
            <Spinner size={65} color={'secondary.700'}></Spinner>
        </Center>
    )
}