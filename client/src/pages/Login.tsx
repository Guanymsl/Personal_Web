import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

const LOG_IN = gql`
  mutation LogIn($name: String!, $password: String!) {
    logIn(name: $name, password: $password) {
      id
      name
    }
  }
`;

function LogIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    onCompleted: () => {
      navigate("/new");
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await logIn({ variables: { name, password } });
  };

  return (
    <section>
      <h2>Login</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </section>
  );
}

export default LogIn;
