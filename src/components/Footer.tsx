import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

interface IUse {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Footer: React.FC<IUse> = ({ setOpen, open }): JSX.Element  => {

    
    return<Navbar fixed="bottom">
    <Container>
        <div></div>
      <Button onClick={() => setOpen(!open)}
      className="mb-4"
      variant='dark' 
      style={{borderRadius: '50%', height: '50px', width: '50px'}}> 
        { open ? 
         <svg width="25" height="5" viewBox="0 1 25 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31 4.4H0V0H31V4.4Z" fill="white"/>
         </svg>         
        : <svg width="25" height="25" viewBox="-3 -5 40 40" fill="none">
         <path d="M31 17.7143H17.7143V31H13.2857V17.7143H0V13.2857H13.2857V0H17.7143V13.2857H31V17.7143Z" fill="white"/>
        </svg>}
        </Button>
    </Container>
  </Navbar>
}

export default Footer;