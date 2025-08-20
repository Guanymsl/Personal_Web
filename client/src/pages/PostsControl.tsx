import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { gql, useQuery, useMutation } from "@apollo/client";

import * as Dnd from "@dnd-kit/core"
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;

const REORDER_POSTS = gql`
  mutation ReorderPosts($order: [Int!]!) {
    reorderPosts(order: $order) {
      id
      position
    }
  }
`;

function Row({ post, onDelete }: { post: Post; onDelete: (p: Post)=>void }) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({ id: post.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    background: "white",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 1px 6px rgba(0,0,0,.06)",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <button
        {...attributes}
        {...listeners}
        aria-label="Drag handle"
        title="Change Order"
        style={{ cursor: "grab" }}
      >
        ☰
      </button>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{post.title}</div>
        {post.content && <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>{post.content}</div>}
      </div>
      <button onClick={() => onDelete(post)} style={{ color: "#b00020" }}>Delete</button>
    </div>
  );
}

function PostsControl() {
  const { loading, error, data } = useQuery(GET_POSTS);

  const [deletePost]  = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [reorderPosts] = useMutation(REORDER_POSTS, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  const [local, setLocal] = useState<Post[]>([]);

  useEffect(() => {
    if (data?.posts) setLocal(data.posts);
  }, [data?.posts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.posts) return <p>No posts found!</p>;

  const onDragEnd = async (evt: Dnd.DragEndEvent) => {
    const { active, over } = evt;
    if (!over || active.id === over.id) return;

    const from = local.findIndex((p) => p.id === active.id);
    const to = local.findIndex((p) => p.id === over.id);
    const next = arrayMove(local, from, to).map((p, i) => ({
      ...p,
      position: i,
    }));

    setLocal(next);

    const order = next.map(p => p.id);

    try {
      await reorderPosts({ variables: { order: order.slice().reverse() } });
    } catch {
      setLocal(local);
    }
  };

  const onDelete = async (post: Post) => {
    await deletePost({ variables: { id: post.id } });
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h2>Posts Control</h2>
      <Link
        to="/new"
        style={{
          textDecoration: "none",
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#f7f7f7",
        }}
      >
        + New Post
      </Link>
      <Link
        to="/posts"
        style={{
          textDecoration: "none",
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "#f7f7f7",
        }}
      >
        + Return
      </Link>
    </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={local.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ display: "grid", gap: 10 }}>
            {local.map((p) => (
              <Row key={p.id} post={p} onDelete={onDelete} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}

export default PostsControl;
