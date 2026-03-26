import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonModal,
  IonInput,
  IonToast,
  IonLoading,
  IonAlert,
  IonBadge,
  IonCard,
  IonCardContent,
  IonFooter,
  IonSpinner,
  IonText,
} from "@ionic/react";
import {
  arrowBackOutline,
  createOutline,
  trashOutline,
  personOutline,
} from "ionicons/icons";
import axios from "axios";
import { Storage } from "@ionic/storage";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/apiConfig";

const storage = new Storage();

function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState({ show: false, user: null });
  const [toast, setToast] = useState({ show: false, msg: "", color: "success" });
  const [editForm, setEditForm] = useState({ nombre: "", apellido: "", correo_electronico: "" });

  useEffect(() => {
    const init = async () => {
      await storage.create();
      const saved = await storage.get("user");
      if (saved) setCurrentUser(JSON.parse(saved));
      fetchUsers();
    };
    init();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/usuarios`);
      setUsers(data);
    } catch {
      setToast({ show: true, msg: "Error al cargar los usuarios", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      setToast({ show: true, msg: "Usuario eliminado correctamente", color: "success" });
    } catch {
      setToast({ show: true, msg: "Error al eliminar el usuario", color: "danger" });
    }
  };

  const openEditModal = (record) => {
    setEditingUser(record);
    setEditForm({
      nombre: record.nombre,
      apellido: record.apellido,
      correo_electronico: record.correo_electronico,
    });
    setIsModalOpen(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:4000/api/usuarios/${editingUser.id}`, editForm);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...editForm } : u))
      );
      setIsModalOpen(false);
      setToast({ show: true, msg: "Usuario actualizado correctamente", color: "success" });
    } catch (err) {
      setToast({ show: true, msg: err.response?.data?.error || "Error al actualizar", color: "danger" });
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
          <IonTitle>Gestión de Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {users.map((u) => (
              <IonCard key={u.id} style={{ margin: "8px 0", borderRadius: 12 }}>
                <IonCardContent>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <IonIcon icon={personOutline} style={{ fontSize: 32, color: "#667eea" }} />
                    <div style={{ flex: 1 }}>
                      <IonLabel>
                        <h2><strong>{u.nombre} {u.apellido}</strong></h2>
                        <p>{u.correo_electronico}</p>
                        <small style={{ color: "gray" }}>
                          Registrado: {new Date(u.createdAt).toLocaleDateString("es-CO")}
                        </small>
                      </IonLabel>
                      {u.id === currentUser?.id && (
                        <IonBadge color="primary" style={{ marginTop: 4 }}>Tú</IonBadge>
                      )}
                    </div>
                    {u.id !== currentUser?.id && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <IonButton fill="outline" size="small" onClick={() => openEditModal(u)}>
                          <IonIcon slot="icon-only" icon={createOutline} />
                        </IonButton>
                        <IonButton
                          fill="outline"
                          color="danger"
                          size="small"
                          onClick={() => setDeleteAlert({ show: true, user: u })}
                        >
                          <IonIcon slot="icon-only" icon={trashOutline} />
                        </IonButton>
                      </div>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
            {users.length === 0 && (
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <IonText color="medium"><h3>No hay usuarios registrados</h3></IonText>
              </div>
            )}
          </IonList>
        )}
      </IonContent>

      {/* Modal de edición */}
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Editar Usuario</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsModalOpen(false)}>Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput
              value={editForm.nombre}
              onIonChange={(e) => setEditForm({ ...editForm, nombre: e.detail.value })}
            />
          </IonItem>
          <IonItem style={{ marginTop: 8 }}>
            <IonLabel position="floating">Apellido</IonLabel>
            <IonInput
              value={editForm.apellido}
              onIonChange={(e) => setEditForm({ ...editForm, apellido: e.detail.value })}
            />
          </IonItem>
          <IonItem style={{ marginTop: 8 }}>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              value={editForm.correo_electronico}
              onIonChange={(e) => setEditForm({ ...editForm, correo_electronico: e.detail.value })}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleUpdateUser} style={{ marginTop: 24 }} color="primary">
            Guardar cambios
          </IonButton>
        </IonContent>
      </IonModal>

      {/* Alerta de confirmación de borrado */}
      <IonAlert
        isOpen={deleteAlert.show}
        onDidDismiss={() => setDeleteAlert({ show: false, user: null })}
        header="Confirmar eliminación"
        message={`¿Eliminar a "${deleteAlert.user?.nombre} ${deleteAlert.user?.apellido}"?`}
        buttons={[
          { text: "Cancelar", role: "cancel" },
          {
            text: "Eliminar",
            role: "destructive",
            handler: () => handleDeleteUser(deleteAlert.user?.id),
          },
        ]}
      />

      <IonFooter>
        <IonToolbar color="primary">
          <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 0" }}>
            <IonButton fill="clear" color="light" onClick={() => navigate("/home")}>Catálogo</IonButton>
            <IonButton fill="clear" color="light" onClick={() => navigate("/admin")}>Gestión</IonButton>
            <IonButton fill="clear" color="light" onClick={() => navigate("/usuarios")}>Usuarios</IonButton>
            <IonButton fill="clear" color="light" onClick={() => navigate("/carrito")}>Carrito</IonButton>
          </div>
        </IonToolbar>
      </IonFooter>

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

export default UserManagement;
