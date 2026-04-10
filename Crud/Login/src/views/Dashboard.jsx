import { useState, useEffect } from "react";
import { ProductController } from "../controllers/ProductController";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const navigate = useNavigate();

  useEffect(() => {
    ////// Read //////
    setProducts(ProductController.getProducts());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      ////// Update //////
      const updated = ProductController.updateProduct(editingId, formData.name, formData.price);
      if (updated) {
        setProducts(ProductController.getProducts());
        setEditingId(null);
        setFormData({ name: "", price: "" });
      }
    } else {
      ////// Create //////
      const created = ProductController.addProduct(formData.name, formData.price);
      if (created) {
        setProducts(ProductController.getProducts());
        setFormData({ name: "", price: "" });
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price });
  };

  ////// Delete //////
  const handleDelete = (id) => {
    ProductController.deleteProduct(id);
    setProducts(ProductController.getProducts());
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Zona Protegida - CRUD Interfaz (MVC)</h2>
        <button onClick={handleLogout} style={{ padding: "8px 16px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cerrar Sesión</button>
      </header>

      <section style={{ marginTop: "20px" }}>
        <h3>{editingId ? "Editar Producto" : "Añadir Producto"}</h3>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre del Producto"
            value={formData.name}
            onChange={handleInputChange}
            style={{ marginRight: "10px", padding: "8px" }}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleInputChange}
            style={{ marginRight: "10px", padding: "8px" }}
            required
          />
          <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            {editingId ? "Actualizar" : "Crear"}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setFormData({ name: "", price: "" }); }}
              style={{ marginLeft: "10px", padding: "8px 16px", backgroundColor: "#9e9e9e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Cancelar
            </button>
          )}
        </form>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Nombre</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Precio</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{product.id}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{product.name}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>${product.price}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <button onClick={() => handleEdit(product)} style={{ marginRight: "10px", padding: "6px 12px", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Editar</button>
                  <button onClick={() => handleDelete(product.id)} style={{ padding: "6px 12px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Eliminar</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>No hay productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;