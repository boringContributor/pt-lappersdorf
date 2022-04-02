
import { Box } from '@chakra-ui/react';
import { NextPage } from 'next/types';
import { PageHeaderImg } from '../components/page-header-img';
import { PageHeading } from "../components/page-heading";

const description = 'Hier finden Sie aktuelle Themen rund um die Praxis.'
const backgroundURL = 'https://ucarecdn.com/db8f70f4-8148-40ae-9747-a1f50face564/-/progressive/yes/-/format/auto/-/resize/2000x/';

const Aktuelles: NextPage = () => {
    return (
        <Box>
            <PageHeaderImg backgroundURL={backgroundURL} />
            <PageHeading title="Aktuelles" description={description} />
        </Box>
    )
};

export default Aktuelles;