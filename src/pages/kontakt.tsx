import { ContactInformation, ContactInformationProps } from "../components/contact-information";
import { Box } from '@chakra-ui/react';
import { PageHeading } from "../components/page-heading";
import { PageHeader } from "../components/page-header";
import { gql, request } from 'graphql-request'
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageMeta } from "../types/page-meta";

type ContactPage = ContactInformationProps & PageMeta

export const getStaticProps: GetStaticProps = async () => {
    const query = gql`
    query {
        contact(where: { slug: "contact"}) {
          address
          fax
          phone
          email
          description
        }
      }
  `;

    const data = await request<{ contact: ContactPage }>(process.env.graphql as string, query);

    if (!data.contact) {
        return {
            notFound: true
        }
    }

    return {
        props: data,
        revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
    };
};

const backgroundURL = 'https://ucarecdn.com/2a4ecaaa-4a5d-4c62-858a-b7be677ee195/-/progressive/yes/-/format/auto/-/resize/2000x/'
const Contact = ({ contact }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Box>
            <PageHeader backgroundURL={backgroundURL} />
            <PageHeading title="Unsere" underlinedTitle='Öffnungszeiten' description={contact.description} />
            <ContactInformation {...contact} />
        </Box>
    )
};

export default Contact;