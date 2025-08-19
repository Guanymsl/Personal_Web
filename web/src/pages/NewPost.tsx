import * as React from "react";
import { useState } from "react";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`(暫時) 新增文章：${title}\n${content}`);
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
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} />
        </label>
        <button type="submit">Create</button>
      </form>
    </section>
  );
}

export default NewPost;
