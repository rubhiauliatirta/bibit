import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>BitMovie</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
