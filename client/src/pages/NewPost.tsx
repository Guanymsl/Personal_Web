import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

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

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      navigate("/posts/control");
    },
    refetchQueries: [{ query: GET_POSTS }],
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ variables: { title, content } });
  };

  return (
    <section>
      <h2>New Post</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Title
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Content
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </section>
  );
}

export default NewPost;
