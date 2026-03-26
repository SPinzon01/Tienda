import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
  IonToast,
  IonIcon,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/apiConfig";
import { Storage } from "@ionic/storage";
import axios from "axios";

const storage = new Storage();

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", color: "success" });
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.correo_electronico || !form.password) {
      setToast({ show: true, msg: "Completa todos los campos requeridos", color: "warning" });
      return;
    }
    setLoading(true);
    
    // El endpoint se define aquí para que esté disponible en el catch
    const endpoint = isRegister
      ? `${BASE_URL}/usuarios`
      : `${BASE_URL}/usuarios/login`;

    try {
      await storage.create();
      const payload = isRegister
        ? {
            nombre: form.nombre,
            apellido: form.apellido,
            correo_electronico: form.correo_electronico,
            password: form.password,
          }
        : {
            correo_electronico: form.correo_electronico,
            password: form.password,
          };

      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (isRegister) {
        setIsRegister(false);
        setToast({ show: true, msg: "Registro exitoso. Ahora puedes iniciar sesión", color: "success" });
      } else {
        const usuarioAGuardar = data.usuario || data;
        await storage.set("user", JSON.stringify(usuarioAGuardar));
        navigate("/home");
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = err.response ? `Error ${err.response.status}` : err.message;
      setToast({ 
        show: true, 
        msg: `Error conectando a ${endpoint}: ${errorMsg}`, 
        color: "danger" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Tienda Electrónica</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{ "--background": "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}
        >
          <IonCard
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <IonCardContent className="ion-padding">
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <IonIcon
                  icon={personCircleOutline}
                  style={{ fontSize: 64, color: "#667eea" }}
                />
                <h2 style={{ margin: "8px 0 0", fontWeight: 700, fontSize: 22 }}>
                  {isRegister ? "Crear cuenta" : "Iniciar sesión"}
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <>
                    <IonItem fill="none" style={{ marginTop: 8 }}>
                      <IonInput
                        label="Nombre"
                        labelPlacement="floating"
                        placeholder="Ej: Jerónimo"
                        type="text"
                        value={form.nombre}
                        onIonInput={(e) => handleChange("nombre", e.detail.value)}
                        required
                      />
                    </IonItem>
                    <IonItem fill="none" style={{ marginTop: 8 }}>
                      <IonInput
                        label="Apellido"
                        labelPlacement="floating"
                        placeholder="Ej: González"
                        type="text"
                        value={form.apellido}
                        onIonInput={(e) => handleChange("apellido", e.detail.value)}
                        required
                      />
                    </IonItem>
                  </>
                )}

                <IonItem fill="none" style={{ marginTop: 8 }}>
                  <IonInput
                    label="Correo electrónico"
                    labelPlacement="floating"
                    placeholder="nombre@correo.com"
                    type="email"
                    value={form.correo_electronico}
                    onIonInput={(e) => handleChange("correo_electronico", e.detail.value)}
                    required
                  />
                </IonItem>

                <IonItem fill="none" style={{ marginTop: 8 }}>
                  <IonInput
                    label="Contraseña"
                    labelPlacement="floating"
                    placeholder="••••••••"
                    type="password"
                    value={form.password}
                    onIonInput={(e) => handleChange("password", e.detail.value)}
                    required
                  />
                </IonItem>

                <IonButton
                  expand="block"
                  type="submit"
                  style={{ marginTop: 28, height: "45px" }}
                  color="primary"
                  strong={true}
                >
                  {isRegister ? "Registrarse" : "Ingresar"}
                </IonButton>
              </form>

              <IonButton
                fill="clear"
                expand="block"
                onClick={() => setIsRegister(!isRegister)}
                style={{ marginTop: 12 }}
              >
                <IonText color="medium" style={{ fontSize: "14px" }}>
                  {isRegister
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? Regístrate"}
                </IonText>
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <IonLoading isOpen={loading} message="Procesando..." />
        <IonToast
          isOpen={toast.show}
          message={toast.msg}
          color={toast.color}
          duration={3000}
          onDidDismiss={() => setToast({ ...toast, show: false })}
        />
      </IonContent>
    </IonPage>
  );
}

export default AuthForm;