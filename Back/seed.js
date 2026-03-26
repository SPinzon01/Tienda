const { Device } = require("./models");

const testProducts = [
  {
    nombre: "iPhone 15 Pro",
    marca: "Apple",
    tipo: "Smartphone",
    precio: 4500000,
    descripcion: "Cámara de 48MP, Chip A17 Pro, Titanio aeroespacial, 128GB.",
    fecha_lanzamiento: "2023-09-22",
    imagen: "https://i.blogs.es/74da7a/iphone-15-pro-max-blue-titanium-side-view-vertical/1366_2000.jpeg"
  },
  {
    nombre: "Samsung Galaxy S24 Ultra",
    marca: "Samsung",
    tipo: "Smartphone",
    precio: 5200000,
    descripcion: "Pantalla AMOLED 2X, S-Pen integrado, IA Avanzada Galaxy.",
    fecha_lanzamiento: "2024-01-17",
    imagen: "https://media.solotodo.com/media/products/1865912_picture_1705646399.webp"
  },
  {
    nombre: "MacBook Air M3",
    marca: "Apple",
    tipo: "Laptop",
    precio: 6800000,
    descripcion: "Chip M3, Pantalla Liquid Retina de 13.6 pulgadas, 8GB RAM.",
    fecha_lanzamiento: "2024-03-04",
    imagen: "https://www.apple.com/v/macbook-air-13-and-15-m2/e/images/overview/design/design_mba_m2_m3__ecl04u22736u_large.jpg"
  },
  {
    nombre: "Sony WH-1000XM5",
    marca: "Sony",
    tipo: "Audio",
    precio: 1400000,
    descripcion: "Cancelación de ruido líder en la industria, 30 horas de batería.",
    fecha_lanzamiento: "2022-05-20",
    imagen: "https://www.sony.com.co/image/6334515152a5146f6f97f7447477c77f?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=600&hei=600"
  },
  {
    nombre: "Nintendo Switch OLED",
    marca: "Nintendo",
    tipo: "Consola",
    precio: 1800000,
    descripcion: "Pantalla OLED de 7 pulgadas, 64GB de almacenamiento interno.",
    fecha_lanzamiento: "2021-10-08",
    imagen: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/v1/ncom/es_LA/switch/system/nintendo-switch-oled-model-white/gallery/image01"
  },
  {
    nombre: "iPad Pro M4",
    marca: "Apple",
    tipo: "Tablet",
    precio: 5500000,
    descripcion: "Pantalla Ultra Retina XDR, Chip M4 de última generación.",
    fecha_lanzamiento: "2024-05-15",
    imagen: "https://www.apple.com/v/ipad-pro/aq/images/overview/closer-look/gold/finish_silver__b1jdzb09j8qu_large.jpg"
  },
  {
    nombre: "Logitech MX Master 3S",
    marca: "Logitech",
    tipo: "Periférico",
    precio: 450000,
    descripcion: "Sensor de 8000 DPI, Clics silenciosos, Desplazamiento MagSpeed.",
    fecha_lanzamiento: "2022-05-24",
    imagen: "https://resource.logitech.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png?v=1"
  },
  {
    nombre: "Monitor LG UltraGear 27\"",
    marca: "LG",
    tipo: "Monitor",
    precio: 1600000,
    descripcion: "QHD IPS, 144Hz, Compatible con NVIDIA G-SYNC.",
    fecha_lanzamiento: "2022-11-01",
    imagen: "https://www.lg.com/us/images/monitors/md08000782/gallery/dz-1.jpg"
  },
  {
    nombre: "Garmin Fenix 7 Pro",
    marca: "Garmin",
    tipo: "Smartwatch",
    precio: 3200000,
    descripcion: "Carga solar, Linterna LED, Mapas TopoActive.",
    fecha_lanzamiento: "2023-05-31",
    imagen: "https://res.garmin.com/en/products/010-02777-10/g/rf-12345.jpg"
  },
  {
    nombre: "Keychron Q1 Max",
    marca: "Keychron",
    tipo: "Teclado",
    precio: 850000,
    descripcion: "Teclado mecánico custom, Wireless 2.4GHz, Estructura de aluminio.",
    fecha_lanzamiento: "2023-12-15",
    imagen: "https://www.keychron.com/cdn/shop/files/Keychron-Q1-Max-QMK-VIA-Wireless-Custom-Mechanical-Keyboard-1_800x.jpg"
  }
];

const seed = async () => {
  try {
    // Sincronizar con force: true para limpiar la tabla Devices
    await Device.sync({ force: true });
    console.log("-----------------------------------------");
    console.log("🗑️  Base de datos limpiada correctamente.");
    
    await Device.bulkCreate(testProducts);
    console.log("📦 10 productos de prueba creados.");
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sembrar la base de datos:", error);
    process.exit(1);
  }
};

seed();
