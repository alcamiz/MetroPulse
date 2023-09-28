import React from 'react'

function HomePage() {
    const MAYO_CLINIC_URL = "https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/symptoms-causes/syc-20373410";
    const styles = {
        container: {
            padding: '20px',
            maxWidth: '100%',
            margin: '0 auto',
            height: 'calc(100vh - 60px)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'  // Centers content vertically within the container
        },
        header: {
            textAlign: 'center',
            padding: '5px 0',  // Reduced top and bottom padding
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
            marginBottom: '15px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center'
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
                    Hypertension, commonly known as high blood pressure, is a pressing health concern that affects disproportionately affects approximately <strong>44 percent</strong> of New York City's African American residents.
                </p>
                <p style={styles.paragraph}>
                    A significant number of African American New Yorkers are either unaware of their hypertension status or know they have the condition but don't seek treatment.
                    This lack of awareness and action can lead to severe health complications. <a style={styles.link} href={MAYO_CLINIC_URL}>Learn more</a>.
                </p>
                <footer style={styles.footer}>
                    Join us in spreading awareness and making a difference in the community.
                </footer>
            </section>
        </div>
    );
}

export default HomePage;