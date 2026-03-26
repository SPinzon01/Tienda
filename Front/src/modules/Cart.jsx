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
  IonIcon,
  IonButtons,
  IonText,
  IonCard,
  IonCardContent,
  IonFooter,
  IonBadge,
} from "@ionic/react";
import { trashOutline, cartOutline, arrowBackOutline } from "ionicons/icons";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert(`¡Compra realizada! Total: $${total.toLocaleString("es-CO")}`);
    clearCart();
    navigate("/home");
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
          <IonTitle>
            <IonIcon icon={cartOutline} style={{ marginRight: 8 }} />
            Carrito de Compras
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cart.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
              gap: 16,
            }}
          >
            <IonIcon
              icon={cartOutline}
              style={{ fontSize: 64, color: "#ccc" }}
            />
            <IonText color="medium">
              <h2>Tu carrito está vacío</h2>
            </IonText>
            <IonButton fill="outline" onClick={() => navigate("/home")}>
              Ver catálogo
            </IonButton>
          </div>
        ) : (
          <>
            <IonList>
              {cart.map((item) => (
                <IonCard key={item.id} style={{ margin: "8px 0" }}>
                  <IonCardContent>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      {item.imagen && (
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "contain",
                            borderRadius: 8,
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <IonLabel>
                          <h2>{item.nombre}</h2>
                          <p>{item.marca}</p>
                        </IonLabel>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 4,
                          }}
                        >
                          <IonBadge color="primary">x{item.qty}</IonBadge>
                          <IonText color="success">
                            <strong>
                              ${(item.precio * item.qty).toLocaleString("es-CO")}
                            </strong>
                          </IonText>
                        </div>
                      </div>
                      <IonButton
                        fill="clear"
                        color="danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <IonIcon slot="icon-only" icon={trashOutline} />
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>

            <IonCard color="light" style={{ marginTop: 16 }}>
              <IonCardContent>
                <IonItem lines="none">
                  <IonLabel>
                    <h2>
                      <strong>Total a pagar</strong>
                    </h2>
                  </IonLabel>
                  <IonText slot="end" color="success">
                    <h2>
                      <strong>${total.toLocaleString("es-CO")}</strong>
                    </h2>
                  </IonText>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </>
        )}
      </IonContent>

      {cart.length > 0 && (
        <IonFooter>
          <IonToolbar>
            <div style={{ padding: "8px 16px", display: "flex", gap: 8 }}>
              <IonButton
                fill="outline"
                color="danger"
                expand="block"
                style={{ flex: 1 }}
                onClick={clearCart}
              >
                Vaciar carrito
              </IonButton>
              <IonButton
                expand="block"
                color="success"
                style={{ flex: 2 }}
                onClick={handleCheckout}
              >
                Finalizar compra — ${total.toLocaleString("es-CO")}
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
}

export default Cart;
