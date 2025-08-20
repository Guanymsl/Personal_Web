import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  position: number;
}

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      position
    }
  }
`;

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const navigate = useNavigate();

  const isAuthed = Boolean(sessionStorage.getItem("authToken"));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.posts) return <p>No posts found</p>;

  return (
    <section>
      <h2>Posts</h2>

      {isAuthed && (
        <button onClick={() => navigate("/posts/control")}>
          Go to Posts Control
        </button>
      )}

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
