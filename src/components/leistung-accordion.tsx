import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export interface ItemProps {
    title: string;

    description?: string;
}
export const LeistungAccordion = (items: ItemProps[]) => {
    return <Accordion defaultIndex={[0]} allowMultiple>
        {Object.values(items).map(item => <Item key={item.title} {...item} />)}
    </Accordion>
};

const Item: FC<ItemProps> = ({ title, description }) => {
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const hoverBg = useColorModeValue('gray.50', 'gray.700');

    return (
        <AccordionItem
            m={5}
            borderRadius='lg'
            boxShadow='lg'
            border='1px solid'
            borderColor={borderColor}
            overflow='hidden'
            transition="all 0.3s ease-in-out"
            _hover={{
                boxShadow: 'xl',
                borderColor: 'var(--primary)',
                transform: 'translateY(-2px)'
            }}>
            <h2>
                <AccordionButton
                    py={6}
                    px={8}
                    _hover={{
                        bg: hoverBg
                    }}
                    _expanded={{
                        bg: 'var(--primary-light)',
                        color: 'var(--primary)',
                    }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        flex="1"
                        textAlign="left"
                        gap={3}>
                        <FaCheckCircle size={20} color="var(--primary)" />
                        <Text
                            lineHeight={1.3}
                            fontWeight={600}
                            fontSize={{ base: 'md', md: 'lg' }}>
                            {title}
                        </Text>
                    </Box>
                    {description && <AccordionIcon boxSize={6} />}
                </AccordionButton>
            </h2>
            {description && (
                <AccordionPanel
                    pb={6}
                    px={8}
                    pt={2}
                    color={useColorModeValue('gray.600', 'gray.300')}
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={1.8}>
                    {description}
                </AccordionPanel>
            )}
        </AccordionItem>
    );
};
