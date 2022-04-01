import { ContactInformation } from "../components/contact-information";
import { Box } from '@chakra-ui/react';
import { PageHeading } from "../components/page-heading";

const description = 'Für Behandlungen sind wir gerne nach telefonischer Vereinbarung für Sie da! \n\rBei Fragen sind wir außerdem gerne per E-Mail und telefonisch erreichbar. Wir machen auch Hausbesuche!'

const contactDetails = {
    phone: '0941 2800520',
    address: 'Regengasse 2 93138 Lappersdorf',
    fax: '0941 28005222',
    email: 'info@physioteam-lappersdorf.de'
}
const Contact = () => {
    return (
        <Box>
            <PageHeading title="Unsere" underlinedTitle='Öffnungszeiten' description={description} />
            <ContactInformation {...contactDetails} />
        </Box>
    )
};

export default Contact;