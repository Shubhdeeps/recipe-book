import { Button, Container, Navbar } from "react-bootstrap";


const Header: React.FC = () => {

    return<Navbar sticky="top" expand="lg" variant="light" bg='dark'>
    <Container>
      <Navbar.Brand href="/recipe-book" style={{color: 'white'}}>Recipe Book</Navbar.Brand>
    </Container>
  </Navbar>
}

export default Header;