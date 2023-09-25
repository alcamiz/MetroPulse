import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function App() {
  const url = "https://gitlab.com/api/v4/projects/50434557/repository/commits/ky5t0nbr";
  return (
    <div>
      <div className="App">
        <div className="App-header">
          About Metropulse
        </div>
      </div>
      <div>
        <h1>Our Mission</h1>
        <p>We are</p>
      </div>
      <div>
        <h1>Where does our data come from?!</h1>
        <p>We are</p>
      </div>
      <div className="OurTeam">
        <Card.Body>Our Team</Card.Body>
      </div>
      <div class="Team">
        <div class="teamGrid">
          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://ia903204.us.archive.org/4/items/discordprofilepictures/discordblue.png" />
            <Card.Body>
              <Card.Title>Alex Cabrera</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">GIT</small>
            </div>
          </div>


          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://ia903204.us.archive.org/4/items/discordprofilepictures/discordblue.png" />
            <Card.Body>
              <Card.Title>Thomas Moody</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">GIT</small>
            </div>
          </div>


          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://ia903204.us.archive.org/4/items/discordprofilepictures/discordblue.png" />
            <Card.Body>
              <Card.Title>Kamil Kawolski</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">GIT</small>
            </div>
          </div>

          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://ia903204.us.archive.org/4/items/discordprofilepictures/discordblue.png" />
            <Card.Body>
              <Card.Title>Kyston Brown</Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">url</small>
            </div>
          </div>

        </div>
      </div>
      <div>
        <h1>Git Overall</h1>
        <p></p>
      </div>
    </div>
  );
}

export default App;
