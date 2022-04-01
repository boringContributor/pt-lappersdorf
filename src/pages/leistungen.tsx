import { Box } from '@chakra-ui/react';
import { PageHeading } from "../components/page-heading";

const description = 'In unserer Praxis für Physiotherapie und Krankengymnastik bieten wir Ihnen eine Vielzahl an unterschiedlichen Leistungen an.'


const Leistungen = () => {
    return (
        <Box>
            <PageHeading title="Unsere" underlinedTitle='Leistungen' description={description} />
        </Box>
    )
};

export default Leistungen;