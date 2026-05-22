function Card({ title, amount }) {
    return (
      <div className="card">
        <h2>{title}</h2>
        <h3>{amount} FCFA</h3>
      </div>
    )
  }
  
  export default Card