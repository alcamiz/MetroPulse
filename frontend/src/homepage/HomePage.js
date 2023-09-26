import React from 'react'

function HomePage() {

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            height: '100vh',  // Make it full viewport height
            borderRadius: '10px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'  // Centers content vertically within the container
        },
        header: {
            textAlign: 'center',
            padding: '10px 0',  // Reduced top and bottom padding
            borderRadius: '10px 10px 0 0',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '2.5em',
            marginTop: '10px'  // Reduced margin for further adjustment
        },
        title: {
            margin: '20px 0',
            color: '#ffffff',
            fontSize: '24px',
        },
        paragraph: {
            fontSize: '18px',
            marginBottom: '15px'
        },
        link: {
            color: '#007bff',
            textDecoration: 'none'
        },
        footer: {
            marginTop: '30px',
            textAlign: 'center',
            fontStyle: 'italic'
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>MetroPulse</h1>
            </header>
            
            <section>
                <h2 style={styles.title}>Hypertension Awareness in New York City</h2>
                
                <p style={styles.paragraph}>
                    Hypertension, commonly known as high blood pressure, is a pressing health concern that affects approximately <strong>30 percent</strong> of New York City's residents.
                </p>
                
                <p style={styles.paragraph}>
                    A significant number of New Yorkers are either unaware of their hypertension status or know they have the condition but don't seek treatment. This lack of awareness and action can lead to severe health complications. <a style={styles.link} href="#" target="_blank" rel="noopener noreferrer">Learn more</a>.
                </p>

                <footer style={styles.footer}>
                    Join us in spreading awareness and making a difference in our community.
                </footer>
            </section>
        </div>
    );
}

export default HomePage;