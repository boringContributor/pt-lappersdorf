import { ContactInformation } from "../components/contact-information";
import { Box } from '@chakra-ui/react';
import { PageHeading } from "../components/page-heading";
import { PageHeader } from "../components/page-header";

const description = 'Für Behandlungen sind wir gerne nach telefonischer Vereinbarung für Sie da! \n\rBei Fragen sind wir außerdem gerne per E-Mail und telefonisch erreichbar. Wir machen auch Hausbesuche!'

const contactDetails = {
    phone: '0941 2800520',
    address: 'Regengasse 2 93138 Lappersdorf',
    fax: '0941 28005222',
    email: 'info@physioteam-lappersdorf.de'
}

const backgroundURL = 'https://ucarecdn.com/2a4ecaaa-4a5d-4c62-858a-b7be677ee195/-/progressive/yes/-/format/auto/-/resize/2000x/'
const Contact = () => {
    return (
        <Box>
            <PageHeader backgroundURL={backgroundURL} />
            <PageHeading title="Unsere" underlinedTitle='Öffnungszeiten' description={description} />
            <ContactInformation {...contactDetails} />
        </Box>
    )
};

export default Contact;