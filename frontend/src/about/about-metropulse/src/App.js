import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';

function App() {
  const [commitNum, setCommitCount] = useState(0);

  useEffect(() => {
    const url = 'https://gitlab.com/api/v4/projects/50434557/repository/commits';

    const member = 'Ky5t0nbr';
    const member0 = 'Alex Cabrera';
    const member1 = 'tjmoody18';
    const member2 = 'Kamil Kalowski';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const memberCommits = data.filter((commit) => commit.author_name.toLowerCase() === member.toLowerCase());
        setCommitCount(memberCommits.length);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []);
  return (
    <div>
      <div className="App">
        <div className="App-header">
          About Metropulse
        </div>
      </div>
      <div>
        <div class="textblock" >
          <h1 >Our Mission</h1>
          <p>Metropulse is an online resource aimed at providing information to African American citezens facing Hypertension.
            We wish to equip you with the data on testing centers to gauge your risk, medical centers to get treatment, in
            locations near to yourself, or the centers themselves!
          </p>
        </div>
      </div>
      <div>
        <div class="textblock">
          <h1>Where does our data come from?!</h1>
          <p>We get our data from the home webpages of medical centers as well as information of testing centers
            from an expansive database aimed at easing your acces to them. We strive to give you the easiest
            methods of accesing these centers try to give you the most releveant data to do so.
          </p>
        </div>
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
              <Card.Title>Kamil Kalowski</Card.Title>
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
              <p>Commits : {commitNum}</p>
            </div>
          </div>

        </div>
      </div>
      <div>
        <div class="textblock">
          <h1>Git Overall</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default App;
