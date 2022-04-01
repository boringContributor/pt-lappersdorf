import { Box } from '@chakra-ui/react';
import { PageHeading } from "../components/page-heading";

const description = 'Hier finden Sie aktuelle Themen rund um die Praxis.'

const Aktuelles = () => {
    return (
        <Box>
            <PageHeading title="Aktuelles" description={description} />
        </Box>
    )
};

export default Aktuelles;