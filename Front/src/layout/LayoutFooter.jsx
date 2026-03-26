import { Layout, Typography } from "antd";
const { Footer } = Layout;
const { Text } = Typography;

function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#001529",
        color: "#fff",
      }}
    >
      <Text style={{ color: "#fff" }}>© 2025 Tienda Electrónica. Todos los derechos reservados. Sergio Pinzón - Camilo Peralta - Santiago Martinez.</Text>
    </Footer>
  );
}

export default AppFooter;
