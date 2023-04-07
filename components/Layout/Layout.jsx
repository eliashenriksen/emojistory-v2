import Container from "react-bootstrap/Container";
import styles from "../../styles/components/Layout.module.css";
import Head from "next/head";



export default function Layout({ title, children, backButton, pageTitle, pageDescription }) {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc"></meta>
      </Head>
      <div className={styles.pageWrapper}>
        <header>
          {/* <Navigation></Navigation> */}
        </header>
        <main>
          <svg width="0" height="0">
            <linearGradient
              id="lgrad"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%" >
              <stop offset="0%" stopColor="rgb(0,255,174)" stopOpacity="1.00"/>
              <stop offset="100%" stopColor="rgb(255,235,59)" stopOpacity="1.00"/>
            </linearGradient>
          </svg>
          <section className={styles.shapeDividerHolder}>
            <div className="custom-shape-divider-bottom-1680863704">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
          </section>
          <section className={styles.shapeDividerHolder2}>
            <div className="custom-shape-divider-bottom-1680863704-2">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill-2"></path>
                </svg>
            </div>
          </section>
          {/* {backButton ? <BackButton></BackButton> : ""} */}
          <Container className={styles.layoutContainer}>
            {/* <Heading title={title}></Heading> */}
            {children}
          </Container>
          {/* <ScrollToTopButton></ScrollToTopButton> */}
        </main>
      </div>
      <footer className={styles.footer}>
        <p>EmojiStory © 2023</p>
      </footer>
    </>
  );
}