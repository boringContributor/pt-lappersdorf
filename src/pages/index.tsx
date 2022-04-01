import type { NextPage } from 'next'
import { Welcome } from '../components/welcome';
import { CommonSEO } from '../components/seo';
import { siteMetadata } from '../data/site-metadata';

const Home: NextPage = () => {

  return (
    <>
      <CommonSEO title={siteMetadata.title} description={siteMetadata.description} />
      <main>
        <Welcome />
      </main>
    </>
  )
}

export default Home
