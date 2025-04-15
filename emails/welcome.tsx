import { Button, Html } from "@react-email/components";
import * as React from "react";

type WelcomeProps = {
  nombre: string;
}

type VerifyCode = {
  strcode: string;
}

export default function Welcome({nombre}: WelcomeProps, {strcode}: VerifyCode) {
  return (
    <Html>
      <div style={{width: "500px", height: "500px", backgroundColor: "#28292C"}}>
        <div style={
          { color: "#ffffff", textAlign: "center",
            height: "70px", backgroundColor: "#121212",
            margin: "auto"
           }}>
          <h1 style={{ color: "#ffffff", textAlign: "center", padding: "15px 0"}}>¡Hola {nombre}!</h1>
        </div>
        <div>
          <h2 style={{color:"#ffffff", textAlign:"center", paddingTop: "10px"}}>
            Recibiste un código de verificación!
          </h2>
          <h3 style={{color:"#ffffff", textAlign:"center", paddingBottom: "10px"}}>
            Por favor ingresalo en la página para verificar tu email.
          </h3>
          <h1 style={
            { color:"#ffffff", textAlign:"center", padding: "10px",
              backgroundColor: "#121212", width: "110px", margin:"auto", borderRadius: "10px",
            }}>{strcode}
          </h1>
        </div>
      </div>
      
    </Html>
  );
}