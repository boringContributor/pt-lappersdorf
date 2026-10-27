import { Box } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { ContactInformation, ContactInformationProps } from "../components/contact-information";
import { PageHero } from "../components/page-hero";
import { PageMeta } from "../types/page-meta";

type ContactPage = ContactInformationProps & PageMeta

export const getServerSideProps: GetServerSideProps = async () => {
    const query = gql`
    query {
        contact(where: { slug: "contact"}) {
          address
          fax
          phone
          email
          description
          backgroundURL {
              url
          }
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
        props: data
    };
};

const Contact: NextPage = ({ contact }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <Box>
            <PageHero title="Unsere" highlight='Öffnungszeiten' description={contact.description} backgroundURL={contact.backgroundURL.url} />
            <ContactInformation {...contact} />
        </Box>
    )
};

export default Contact;