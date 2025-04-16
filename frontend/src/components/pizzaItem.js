function PizzaItem({ nome, descricao, onAdd }) {
    return (
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem 0",
        background: "#ffe5b4"
      }}>
        <h3>{nome}</h3>
        <p>{descricao}</p>
        <button onClick={onAdd}>Adicionar ao Pedido</button>
      </div>
    );
  }
  
  export default PizzaItem;
  