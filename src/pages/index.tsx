import { Box } from '@chakra-ui/react';
import { gql, request } from 'graphql-request';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { PageHeaderImg } from '../components/page-header-img';
import { PageHeading } from '../components/page-heading';
import { CommonSEO } from '../components/seo';
import { Welcome } from '../components/welcome';
import { siteMetadata } from '../data/site-metadata';
import { PageMeta } from '../types/page-meta';
import { URL } from '../types/url';


type Pagedata = PageMeta & { backgroundURL: URL, heroImg: URL }

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
  query {
    pagedata(where: { slug: "start"}) {
      title
      description
      backgroundURL {
        url
      }
      heroImg {
        url
      }
    }
  }
`;

  const data = await request<{ pagedata: Pagedata }>(process.env.graphql as string, query);

  if (!data.pagedata) {
    return {
      notFound: true
    }
  }
  return {
    props: data
  };
};

const Home: NextPage = ({ pagedata: { description, backgroundURL: { url }, heroImg: { url: heroImgURL } } }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box>
      <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PageHeaderImg backgroundURL={url} />
      <Welcome heroImgURL={heroImgURL}>
        <PageHeading title='Herzlich Willkommen,' underlinedTitle='beim Physioteam in Lappersdorf' description={description} />
      </Welcome>

    </Box>
  )
}

export default Home
