
import {
    Box
} from '@chakra-ui/react';
import { PageHeader } from '../components/page-header';
import { PageHeading } from "../components/page-heading";

const description = 'Hier finden Sie aktuelle Themen rund um die Praxis.'
const backgroundURL = 'https://ucarecdn.com/db8f70f4-8148-40ae-9747-a1f50face564/-/progressive/yes/-/format/auto/-/resize/2000x/';

const Aktuelles = () => {
    return (
        <Box>
            <PageHeader backgroundURL={backgroundURL} />
            <PageHeading title="Aktuelles" description={description} />
        </Box>
    )
};

export default Aktuelles;