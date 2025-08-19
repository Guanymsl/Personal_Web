function Posts() {
  const mock = [
    { id: 1, title: "Hello World", content: "First post" },
    { id: 2, title: "Second", content: "More content" },
  ];

  return (
    <section>
      <h2>Posts</h2>
      <div className="grid">
        {mock.map(p => (
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
