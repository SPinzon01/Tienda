import { Layout, Typography, Button, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

function AppHeader({ username }) {
  const navigate = useNavigate();

  const userMenu = (
    <Menu
      items={[
        {
          key: "logout",
          label: (
            <span onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}>
              Cerrar sesión
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#001529",
        padding: "0 30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Title
          level={3}
          style={{ color: "#fff", margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Tienda Electrónica
        </Title>

        <Button type="primary" onClick={() => navigate("/home")}>
          Catálogo de Productos
        </Button>
        <Button type="primary" onClick={() => navigate("/admin")}>
          Gestión de Productos
        </Button>
        <Button type="primary" onClick={() => navigate("/usuarios")}>
          Usuarios
        </Button>
      </div>

      {username && (
        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
          <Button>{`Hola, ${username}`}</Button>
        </Dropdown>
      )}
    </Header>
  );
}

export default AppHeader;
