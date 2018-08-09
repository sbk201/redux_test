import React from "react";
import { Container } from "semantic-ui-react";

export const Containerion=({children})=>
    <Container style={{backgroundColor:"#DDDDDD",width: "30rem", padding: "1rem",marginBottom: "1rem"}}>
      {children}
    </Container>