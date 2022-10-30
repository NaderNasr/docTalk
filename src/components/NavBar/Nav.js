import { Navbar, Container } from 'react-bootstrap';
import './Nav.css'

function Nav({ isLocal, pokeDetails, setIsLocal }) {
  return (
    <>
      <div className='container'>
        <Navbar>
          <Container>
            <Navbar.Brand><strong><h1>Poke Dex</h1></strong></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className='center'>
                <p>Rendering From: <strong>{isLocal ? 'Express DB' : 'Poke API'}</strong></p>
                <p>Number of cards <strong>{pokeDetails.length}</strong> </p>
              </Navbar.Text>
              <Navbar.Text>
                <button onClick={() => setIsLocal(!isLocal)} style={{ marginBottom: '20px' }}>
                  Get {!isLocal ? 'Express DB' : 'Poke API'}
                </button>
              </Navbar.Text>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Nav;