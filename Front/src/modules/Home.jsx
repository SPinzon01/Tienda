import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonModal,
  IonButton,
  IonButtons,
  IonIcon,
  IonTextarea,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonText,
  IonToast,
  IonFooter,
  IonFab,
  IonFabButton,
  IonImg,
  IonSpinner,
} from "@ionic/react";
import {
  cartOutline,
  closeOutline,
  addOutline,
  chatbubbleOutline,
} from "ionicons/icons";
import axios from "axios";
import { Storage } from "@ionic/storage";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/apiConfig";
import { useCart } from "../context/CartContext";

const storage = new Storage();

function Home() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: "", color: "success" });
  const [user, setUser] = useState(null);

  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await storage.create();
      const saved = await storage.get("user");
      if (saved) setUser(JSON.parse(saved));

      try {
        const { data } = await axios.get(`${BASE_URL}/devices`);
        const apiDevices = Array.isArray(data)
          ? data
          : data.devices || [];
        setDevices(apiDevices);
      } catch (error) {
        console.error("Error cargando dispositivos:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSelectDevice = async (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/comentarios/${device.id}`
      );
      setComments(response.data || []);
    } catch {
      setComments([]);
    }
  };

  const handleAddComment = async () => {
    if (!comentario.trim() || !selectedDevice || !user) return;
    try {
      await axios.post("http://localhost:4000/api/comentarios", {
        id_usuario: user.id,
        id_dispositivo: selectedDevice.id,
        texto: comentario,
      });
      const response = await axios.get(
        `http://localhost:4000/api/comentarios/${selectedDevice.id}`
      );
      setComments(response.data || []);
      setComentario("");
      setToast({ show: true, msg: "Comentario agregado", color: "success" });
    } catch {
      setToast({ show: true, msg: "No se pudo agregar el comentario", color: "danger" });
    }
  };

  const handleAddToCart = (device) => {
    addToCart(device);
    setToast({ show: true, msg: `${device.nombre} agregado al carrito 🛒`, color: "success" });
    setIsModalOpen(false);
  };

  const cartCount = cart.reduce((sum, d) => sum + d.qty, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Catálogo de Dispositivos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => navigate("/carrito")} style={{ position: "relative" }}>
              <IonIcon slot="icon-only" icon={cartOutline} />
              {cartCount > 0 && (
                <IonBadge
                  color="danger"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    fontSize: 10,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartCount}
                </IonBadge>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : devices.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 60 }}>
            <IonText color="medium">
              <h3>No hay productos disponibles</h3>
            </IonText>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {devices.map((device) => (
                <IonCol size="12" sizeSm="6" sizeMd="4" key={device.id}>
                  <IonCard
                    className="ion-activatable"
                    onClick={() => handleSelectDevice(device)}
                    style={{ cursor: "pointer", borderRadius: 16 }}
                  >
                    {device.imagen && (
                      <IonImg
                        src={device.imagen}
                        alt={device.nombre}
                        style={{ height: 160, objectFit: "contain", padding: 12 }}
                      />
                    )}
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: 16 }}>{device.nombre}</IonCardTitle>
                      <IonCardSubtitle>{device.marca}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonBadge color="success" style={{ fontSize: 14 }}>
                        ${Number(device.precio).toLocaleString("es-CO")}
                      </IonBadge>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}

        {/* Modal detalle de dispositivo */}
        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedDevice?.nombre}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedDevice && (
              <>
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <img
                    src={selectedDevice.imagen}
                    alt={selectedDevice.nombre}
                    style={{ maxHeight: 200, objectFit: "contain" }}
                  />
                </div>

                <IonList>
                  <IonItem>
                    <IonLabel><strong>Marca:</strong> {selectedDevice.marca}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel><strong>Tipo:</strong> {selectedDevice.tipo}</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <strong>Lanzamiento:</strong> {selectedDevice.fecha_lanzamiento}
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <strong>Precio:</strong>{" "}
                      <IonBadge color="success">
                        ${Number(selectedDevice.precio).toLocaleString("es-CO")}
                      </IonBadge>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel class="ion-text-wrap">
                      <strong>Descripción:</strong> {selectedDevice.descripcion}
                    </IonLabel>
                  </IonItem>
                </IonList>

                <IonButton
                  expand="block"
                  color="success"
                  style={{ marginTop: 16 }}
                  onClick={() => handleAddToCart(selectedDevice)}
                >
                  <IonIcon slot="start" icon={addOutline} />
                  Agregar al carrito
                </IonButton>

                {/* Sección de comentarios */}
                <h3 style={{ marginTop: 24 }}>
                  <IonIcon icon={chatbubbleOutline} style={{ marginRight: 8 }} />
                  Comentarios
                </h3>
                <IonTextarea
                  placeholder="Escribe un comentario..."
                  value={comentario}
                  onIonChange={(e) => setComentario(e.detail.value)}
                  rows={3}
                  style={{ border: "1px solid #ddd", borderRadius: 8, padding: 8 }}
                />
                <IonButton
                  expand="block"
                  onClick={handleAddComment}
                  disabled={!comentario.trim()}
                  style={{ marginTop: 8 }}
                >
                  Agregar comentario
                </IonButton>

                <IonList style={{ marginTop: 16 }}>
                  {comments.map((item, index) => (
                    <IonItem key={index}>
                      <IonLabel class="ion-text-wrap">
                        <strong>{item.user?.nombre}</strong>
                        <p>{item.texto}</p>
                        <small style={{ color: "gray" }}>
                          {new Date(item.createdAt || item.fecha).toLocaleString("es-CO")}
                        </small>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </>
            )}
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={toast.show}
          message={toast.msg}
          color={toast.color}
          duration={2500}
          onDidDismiss={() => setToast({ ...toast, show: false })}
        />
      </IonContent>

      <IonFooter>
        <IonToolbar color="primary">
          <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 0" }}>
            <IonButton fill="outline" onClick={() => navigate("/home")}>
              Catálogo
            </IonButton>
            <IonButton fill="clear" color="light" onClick={() => navigate("/admin")}>
              Gestión
            </IonButton>
            <IonButton fill="clear" color="light" onClick={() => navigate("/usuarios")}>
              Usuarios
            </IonButton>
            <IonButton fill="clear" color="light" onClick={() => navigate("/carrito")}>
              Carrito {cartCount > 0 && `(${cartCount})`}
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default Home;
