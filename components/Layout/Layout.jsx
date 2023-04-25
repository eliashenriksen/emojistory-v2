import Container from "react-bootstrap/Container";
import styles from "../../styles/components/Layout.module.css";
import Head from "next/head";
import BackgroundEmojis from "./BackgroundEmojis";



export default function Layout({ title, children, backButton, pageTitle, pageDescription }) {

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="desc"></meta>
      </Head>
      <BackgroundEmojis></BackgroundEmojis>
      <header>
        {/* <Navigation></Navigation> */}
      </header>
      <main>
        {/* {backButton ? <BackButton></BackButton> : ""} */}
        <Container className={styles.layoutContainer}>
          {/* <Heading title={title}></Heading> */}
          {children}
        </Container>
        {/* <ScrollToTopButton></ScrollToTopButton> */}
      </main>
      {/* <footer className={styles.footer}>
        <p>EmojiStory © 2023</p>
      </footer> */}
    </>
  );
}