import { Navbar, Container } from 'react-bootstrap';
import './Nav.css'

function Nav({ isLocal, pokeDetails, setIsLocal }) {
  return (
    <>
      <div className='container'>
        <Container>
          <Navbar>
            <Container>
              <Navbar.Brand>
                <strong>
                  <h1 style={{lineHeight:'25px'}}>PokeDex</h1>
                </strong>
                <p style={{ fontSize: '10px', lineHeight:'1px', marginLeft:'2px' }}>by: Nader Nasr</p>
              </Navbar.Brand>
              <Navbar.Collapse />
              <div className='center'>
                <Navbar.Text>
                  <p>Rendering From: <strong>{isLocal ? 'Express DB' : 'Poke API'}</strong></p>
                </Navbar.Text>
                <p>Number of cards <strong>{pokeDetails.length}</strong> </p>
                <Navbar.Text>
                </Navbar.Text>
              </div>
              <button onClick={() => setIsLocal(!isLocal)} style={{ marginBottom: '20px' }}>
                Get {!isLocal ? 'Express DB' : 'Poke API'}
              </button>
            </Container>
          </Navbar>
        </Container>
      </div>
    </>
  );
}

export default Nav;