import { gql, useQuery } from "@apollo/client";

interface Post {
  id: number;
  title: string;
  content: string;
}

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.posts) return <p>No posts found</p>;

  return (
    <section>
      <h2>Posts</h2>
      <div className="grid">
        {data.posts.map((p: Post) => (
          <article key={p.id} className="card">
            <h3>{p.title}</h3>
            <p>{p.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Posts;
