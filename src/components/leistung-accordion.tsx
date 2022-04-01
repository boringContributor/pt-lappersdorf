import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text
} from '@chakra-ui/react'
import { FC } from 'react';

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
    return <AccordionItem m={5} borderRadius='1rem' boxShadow='0px 2px 25px 0px rgba(84, 131, 157, 0.2)' padding='2rem'>
        <h2>
            <AccordionButton>
                <Text
                    textAlign='left'
                    lineHeight={1.1}
                    fontWeight={600}>
                    {title}
                </Text>
                {description && <AccordionIcon />}
            </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
            {description}
        </AccordionPanel>
    </AccordionItem>
};
