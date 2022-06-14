import React from "react";

import { Container } from "@bigbinary/neetoui/layouts";
// import { useHistory } from "react-router-dom";
import { Header, MenuBar } from "@bigbinary/neetoui/layouts";
// const [showMenu, setShowMenu] = useState(false);
const Eui = () => (
  <Container isHeaderFixed>
    <Header title="Header" />
    <MenuBar title="Articles" showMenu="true"></MenuBar>
  </Container>
);
export default Eui;
