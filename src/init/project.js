import React from "react";
import { Container } from "semantic-ui-react";

export const Containerion=({children})=>
    <Container style={{backgroundColor:"#DDDDDD",width: "100%", padding: "1rem",marginBottom: "1rem"}}>
      {children}
    </Container>