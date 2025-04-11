import { Button, Html } from "@react-email/components";
import * as React from "react";

type WelcomeProps = {
  nombre: string;
}

export default function Welcome({nombre}: WelcomeProps) {
  return (
    <Html>
      <div style={{width: "500px", height: "500px"}}>
        <h1 style={{ color: "#ffffff", textAlign: "center", height: "70px", backgroundColor: "#0066ff"}}>
          ¡Hola {nombre}!
        </h1>
        <div>
          
        </div>
      </div>
      
    </Html>
  );
}