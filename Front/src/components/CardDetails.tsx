import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native';
import { VStack, HStack, Text, Box, useTheme } from 'native-base';

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
    color?: String;
}

export function CardDetails({
    title,
    description,
    footer = "",
    icon: Icon,
    color,
    children
}: Props) {

    const { colors } = useTheme();

    return (
        <VStack bg='gray.100' p={5} mt={5} rounded={'sm'}>

            <HStack alignItems='center' mb={4}>
                <Icon color={colors.primary[700]} />
                <Text
                    ml={2}
                    color={!color ? 'primary.700' : color}
                    fontSize='sm'
                    textTransform='uppercase'
                >
                    {title}
                </Text>
            </HStack>

            {

                !!description &&
                <Text color={!color ? 'primary.700' : color} fontSize='md'>
                    {description}
                </Text>
            }

            {children}

            {

                !!footer && 
                <Box 
                    borderTopColor='gray.400' 
                    borderTopWidth={1}
                    mt={3}
                >
                    <Text mt={3} color='primary.700' fontSize='sm'>
                        {footer}
                    </Text>
                </Box>

            }

        </VStack>
    );
}