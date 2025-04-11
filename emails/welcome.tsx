import { Button, Html } from "@react-email/components";
import * as React from "react";

type WelcomeProps = {
  nombre: string;
}

export default function Welcome({nombre}: WelcomeProps) {
  return (
    <Html>
      <div style={{width: "500px", height: "500px", backgroundColor: "#e6e6ff"}}>
        <div style={
          { color: "#ffffff", textAlign: "center",
            height: "70px", backgroundColor: "#0066ff",
            margin: "auto"
           }}>
          <h1 style={{ color: "#ffffff", textAlign: "center", padding: "15px 0"}}>¡Hola {nombre}!</h1>
        </div>
        <div>
          <h2 style={{color:"#000000", textAlign:"center", paddingTop: "10px"}}>
            Recibiste un código de verificación!
          </h2>
          <h3 style={{color:"#000000", textAlign:"center", paddingBottom: "10px"}}>
            Por favor ingresalo en la página para verificar tu email.
          </h3>
          <h1 style={
            { color:"#000000", textAlign:"center", padding: "10px",
              backgroundColor: "#b3b3b3", width: "110px", margin:"auto"
            }}>XXXXXX
          </h1>
        </div>
      </div>
      
    </Html>
  );
}