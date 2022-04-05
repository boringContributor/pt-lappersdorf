import { gql, request } from 'graphql-request';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { BlogPostDetail } from '../../components/blog-post-detail';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params) {
        return {
            notFound: true
        }
    }
    const query = gql`
    query {
        blogPost(where: { slug: "${params.slug}" }) {
            title
            description{
                text
            }
            date
            backgroundURL{
                url
            }
        }
    }`;

    const data = await request<any>(process.env.graphql as string, query);

    if (!data.blogPost) {
        return {
            notFound: true
        }
    }
    return {
        props: data,
        revalidate: 60 * 60 // Enables ISR -> Cache response for 1 hour (60 seconds * 60 minutes)
    };
};

interface BlogSlug {
    slug: string;
}

export async function getStaticPaths() {
    const query = gql`
    query {
        blogPosts {
            slug
        }
      }`;

    const data = await request<{ blogPosts: BlogSlug[] }>(process.env.graphql as string, query);

    return {
        paths: data.blogPosts.map(({ slug }) => ({
            params: { slug },
        })),
        fallback: true,
    }
}

export const Post: NextPage = ({ blogPost: { title, description: { text }, date, backgroundURL: { url } } }: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <BlogPostDetail title={title} html={text} date={date} url={url} />
    )
}

export default Post
