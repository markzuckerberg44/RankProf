import { Button, Html } from "@react-email/components";
import * as React from "react";

type WelcomeProps = {
  firstName: string;
}

export default function Welcome({firstName}: WelcomeProps) {
  return (
    <Html>
      <header>Hola {firstName}, aqui tienes tu codigo de confirmacion</header>

      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}