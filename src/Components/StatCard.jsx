export default function StatCard({ title, value }) {
  return (
    <div className="hover-scale" style={styles.card}>
      <h4>{title}</h4>
      <p style={styles.value}>{value}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    border: "2px solid #e53935",
    padding: 25,
    borderRadius: 15,
    minWidth: 180,
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
    transition: "0.3s",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
    color: "#e53935",
  },
};




