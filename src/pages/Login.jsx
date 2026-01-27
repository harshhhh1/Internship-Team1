export default function Login() {
  return (
    <div style={styles.card}>
      <h2>Login</h2>
      <input style={styles.input} placeholder="Email" />
      <input style={styles.input} type="password" placeholder="Password" />
      <button style={styles.btn}>Login</button>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: 400,
    margin: "100px auto",
    padding: 30,
    borderRadius: 12,
    background: "white",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#0f172a",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};
