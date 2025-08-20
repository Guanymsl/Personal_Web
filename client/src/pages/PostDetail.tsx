import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  return (
    <section>
      <h2>Post #{id}</h2>
      <p>等接上 GraphQL 後來撈單篇內容。</p>
    </section>
  );
}

export default PostDetail;
