import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonIcon,
  IonToast,
  IonLoading,
  IonFooter,
} from "@ionic/react";
import { arrowBackOutline, addCircleOutline, cameraOutline, imageOutline } from "ionicons/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import BASE_URL from "../api/apiConfig";

function AdminPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", color: "success" });
  const [form, setForm] = useState({
    nombre: "",
    marca: "",
    tipo: "",
    precio: "",
    imagen: "",
    fecha_lanzamiento: "",
    descripcion: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt, 
      });
      setForm((prev) => ({ ...prev, imagen: image.dataUrl }));
    } catch (error) {
      console.error("Error al tomar foto:", error);
    }
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/devices`, form, {
        headers: { "Content-Type": "application/json" },
      });
      setToast({ show: true, msg: "Producto agregado exitosamente!", color: "success" });
      setForm({ nombre: "", marca: "", tipo: "", precio: "", imagen: "", fecha_lanzamiento: "", descripcion: "" });
    } catch (error) {
      console.error("Error al crear dispositivo:", error);
      setToast({ show: true, msg: "Error al agregar el producto", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => navigate(-1)}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Admin Dolittle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard style={{ borderRadius: 16, maxWidth: 700, margin: "0 auto" }}>
          <IonCardContent>
            <h2 style={{ textAlign: "center", marginBottom: 20, fontWeight: "bold" }}>Nuevo Producto</h2>
            <form onSubmit={handleAddDevice}>
              
              <IonItem fill="none" style={{ marginTop: 8 }}>
                <IonInput
                  label="Nombre *"
                  labelPlacement="floating"
                  placeholder="Ej: Laptop HP"
                  value={form.nombre}
                  onIonInput={(e) => handleChange("nombre", e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem fill="none" style={{ marginTop: 8 }}>
                <IonInput
                  label="Marca *"
                  labelPlacement="floating"
                  placeholder="Ej: HP"
                  value={form.marca}
                  onIonInput={(e) => handleChange("marca", e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem fill="none" style={{ marginTop: 8 }}>
                <IonInput
                  label="Tipo *"
                  labelPlacement="floating"
                  placeholder="Ej: Portátil"
                  value={form.tipo}
                  onIonInput={(e) => handleChange("tipo", e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem fill="none" style={{ marginTop: 8 }}>
                <IonInput
                  label="Precio *"
                  labelPlacement="floating"
                  type="number"
                  placeholder="0.00"
                  value={form.precio}
                  onIonInput={(e) => handleChange("precio", e.detail.value)}
                  required
                  min={0}
                />
              </IonItem>

              <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
                <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>Imagen del Producto *</p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {form.imagen ? (
                    <img 
                      src={form.imagen} 
                      alt="Preview" 
                      style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "12px", marginBottom: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} 
                    />
                  ) : (
                    <div style={{ width: "180px", height: "150px", background: "#f5f5f5", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", color: "#bbb", border: "2px dashed #ddd" }}>
                      <IonIcon icon={imageOutline} style={{ fontSize: "48px" }} />
                    </div>
                  )}
                  <IonButton fill="outline" size="small" onClick={takePhoto}>
                    <IonIcon slot="start" icon={cameraOutline} />
                    {form.imagen ? "Cambiar Foto" : "Subir Foto / Galería"}
                  </IonButton>
                </div>
              </div>

              <IonItem fill="none" style={{ marginTop: 12 }}>
                <IonInput
                  label="Fecha de Lanzamiento *"
                  labelPlacement="floating"
                  type="date"
                  value={form.fecha_lanzamiento}
                  onIonInput={(e) => handleChange("fecha_lanzamiento", e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem fill="none" style={{ marginTop: 8 }}>
                <IonTextarea
                  label="Descripción"
                  labelPlacement="floating"
                  placeholder="Detalles del producto..."
                  rows={3}
                  value={form.descripcion}
                  onIonInput={(e) => handleChange("descripcion", e.detail.value)}
                  autoGrow={true}
                />
              </IonItem>

              <IonButton
                expand="block"
                type="submit"
                color="primary"
                style={{ marginTop: 30, height: "48px" }}
                strong={true}
              >
                <IonIcon slot="start" icon={addCircleOutline} />
                Guardar Producto
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>

      <IonFooter>
        <IonToolbar color="primary">
          <div style={{ display: "flex", justifyContent: "center", gap: 10, padding: "4px 0" }}>
            <IonButton fill="clear" color="light" size="small" onClick={() => navigate("/home")}>Catálogo</IonButton>
            <IonButton fill="clear" color="light" size="small" onClick={() => navigate("/admin")}>Gestión</IonButton>
            <IonButton fill="clear" color="light" size="small" onClick={() => navigate("/usuarios")}>Usuarios</IonButton>
            <IonButton fill="clear" color="light" size="small" onClick={() => navigate("/carrito")}>Carrito</IonButton>
          </div>
        </IonToolbar>
      </IonFooter>

      <IonLoading isOpen={loading} message="Guardando dispositivo..." />
      <IonToast
        isOpen={toast.show}
        message={toast.msg}
        color={toast.color}
        duration={3000}
        onDidDismiss={() => setToast({ ...toast, show: false })}
      />
    </IonPage>
  );
}

export default AdminPanel;