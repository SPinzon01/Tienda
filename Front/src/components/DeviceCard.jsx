import { Card } from "antd";

function DeviceCard({ device, onClick }) {
  return (
    <Card
      hoverable
      style={{ width: "100%", margin: "10px 0", padding: "10px" }}
      onClick={() => onClick(device)}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <img
          alt={device.nombre}
          src={device.imagen}
          style={{ height: 200, objectFit: "contain", borderRadius: 8 }}
        />
      </div>

      <Card.Meta
        title={device.nombre}
        description={`${device.marca} - $${device.precio}`}
      />
    </Card>
  );
}

export default DeviceCard;
