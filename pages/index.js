import Layout from "@/components/Layout/Layout";
import EmojiConverter from "@/components/EmojiConverter";
import styles from "../styles/pages/index.module.css";

export default function Home() {
  
  return (
    <Layout pageTitle="EmojiStory" pageDescription="EmojiStory is a fun tool you can use to convert your sentences into emojis. Where most converters just turn words into matching emojis, this tool turns your whole sentence into a string of emojis that make sense as an overall story.">
      <section className={styles.homeTopContent}>
        <h1>Welcome to EmojiStory! 😍</h1>
        <div>
         <p className={styles.homeTopContentP}>EmojiStory is a tool that you can use to convert sentences into co-responding emojis that are picked in a way which makes sense and explains your sentence.</p>
         <p className={styles.homeTopContentP}>Try it out by entering any kind of sentence below and clicking the convert button. Only english sentences are currently supported.</p>
        </div>
      </section>
      <EmojiConverter></EmojiConverter>
    </Layout>
  )
}
