import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';

function App() {
  const [commitNum, setCommitCount] = useState({});
  useEffect(() => {
    const url = 'https://gitlab.com/api/v4/projects/50434557/repository/commits?per_page=100';
    const members = ['Alex Cabrera', 'Kamil Kalowski', 'Ky5t0nbr', 'tjmoody18'];

    const fetchCommits = async () => {
      const commits = {};
      for (const user of members) {
        const res = await fetch(url);
        const data = await res.json();
        const memberCommits = data.filter((commit) => commit.author_name.toLowerCase() === user.toLowerCase());
        commits[user] = memberCommits.length;
      }

      setCommitCount(commits);
    };
    fetchCommits();
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
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nE0iyc9xZ8qG0UcUaIOYEw.jpeg" height="300px" width="300px" objectFit="cover" />
            <Card.Body>
              <Card.Title>Alex Cabrera</Card.Title>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">GIT</small>
              <p>Commits : {commitNum['Alex Cabrera']}</p>
            </div>
          </div>


          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*_GpoQb0-rD_44PFESJv9DA.jpeg" height="300px" width="300px" objectFit="cover" />
            <Card.Body>
              <Card.Title>Thomas Moody</Card.Title>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">GIT</small>
              <p>Commits : {commitNum['tjmoody18']}</p>
            </div>
          </div>


          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sTL0hCT368MDNizqRcaNbA.jpeg" height="300px" width="300px" objectFit="cover" />
            <Card.Body>
              <Card.Title>Kamil Kalowski</Card.Title>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted"></small>
              <p>Commits : {commitNum['Kamil Kalowski']}</p>
            </div>
          </div>

          <div class="gridCard">
            <div class="cardCap"></div>
            <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*_t8OKhT-uWc2Dlr1ajGzeA.jpeg" height="300px" width="300px" objectFit="cover" />
            <Card.Body>
              <Card.Title>Kyston Brown</Card.Title>
            </Card.Body>
            <div class="card-footer">
              <small class="text-muted">url</small>
              <p>Commits : {commitNum['Ky5t0nbr']}</p>
            </div>
          </div>

        </div>
      </div>
      <div class="Resources">
        <div class="card">
          <h1>Resources</h1>
          <div class="Team">
            <div class="teamGrid">
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>React</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://www.svgrepo.com/show/354202/postman-icon.svg" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Postman</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bootstrap-5-logo-icon.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>BootStrap</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://seeklogo.com/images/Z/zoom-fondo-blanco-vertical-logo-F819E1C283-seeklogo.com.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Zoom</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://seeklogo.com/images/V/visual-studio-code-logo-449D71944F-seeklogo.com.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>VS Code</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://lth.engineering.asu.edu/wp-content/uploads/sites/18/2021/06/Ed.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Ed Discussion</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://seeklogo.com/images/G/gitlab-logo-757620E430-seeklogo.com.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>GitLab</Card.Title>
              </div>
              <div class="resCard">
                <div class="cardCap"></div>
                <Card.Img variant="top" src="https://cdn.icon-icons.com/icons2/2407/PNG/512/namecheap_icon_146138.png" height="150px" width="150px" objectFit="cover" />
                <Card.Title>Name Cheap</Card.Title>
              </div>
            </div>
          </div>
          <h1>Git Overall</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default App;
