import { useState } from "react";
import { Row, Col, Select, Input } from "antd";
import DeviceCard from "./DeviceCard";

const { Option } = Select;
const { Search } = Input;

function DeviceList({ devices = [], onSelectDevice }) {
  const [filterMarca, setFilterMarca] = useState("");
  const [filterNombre, setFilterNombre] = useState("");

  const filteredDevices = devices.filter(
    (device) =>
      device.marca.toLowerCase().includes(filterMarca.toLowerCase()) &&
      device.nombre.toLowerCase().includes(filterNombre.toLowerCase())
  );

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: 20 }}>
        <Select
          placeholder="Filtrar por marca"
          style={{ width: 200 }}
          allowClear
          onChange={(value) => setFilterMarca(value || "")}
        >
          {[...new Set(devices.map((d) => d.marca))].map((marca) => (
            <Option key={marca} value={marca}>
              {marca}
            </Option>
          ))}
        </Select>

        <Search
          placeholder="Buscar por nombre"
          allowClear
          onChange={(e) => setFilterNombre(e.target.value)}
          style={{ width: 200 }}
        />
      </div>

      <Row gutter={[16, 16]}>
        {filteredDevices.map((device) => (
          <Col key={device.id} xs={24} sm={12} md={8} lg={6}>
            <DeviceCard
              device={device}
              onClick={() => onSelectDevice(device)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default DeviceList;
