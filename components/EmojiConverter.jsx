//Remember to remove console logs on cleanup

import { useState } from "react";
import axios from "axios";
import GraphemeSplitter from "grapheme-splitter";
import styles from "../styles/components/EmojiConverter.module.css";

export default function EmojiConverter() {

  const [storyInputValue, setStoryInputValue] = useState("");
  const [storyOutputSentence, setStoryOutputSentence] = useState("");
  const [storyOutputEmojis, setStoryOutputEmojis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emojiFormError, setEmojiFormError] = useState("");
  const splitter = new GraphemeSplitter();

  async function getEmojis(searchValue) {

    try {
        setLoading(true);
        const response = await axios({
          method: "POST",
          url: "/api/emojiapi",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ sentence: searchValue })
        });
        const responseData = response.data;
        console.log(responseData);

        const graphemes = splitter.splitGraphemes(responseData.result);
        const filteredGraphemes = graphemes.filter((string) => string !== "" && string !== " ");


        //https://stackoverflow.com/questions/67309672/how-to-prevent-react-state-overwrites-due-to-asynchronous-code-and-websocket-rac
        setStoryOutputEmojis(prevState => [...prevState, filteredGraphemes]);
        setStoryOutputSentence(storyInputValue);

      } catch (error) {
        console.log(error);
        setEmojiFormError(`Error: ${error.message}`);

      } finally {
        setLoading(false);
      }
    } 

  function generateStory(event) {
    event.preventDefault();
    if(storyInputValue.length === 0) {
      console.log("Please enter a sentence to convert into an Emoji Story.")
      setEmojiFormError("Please enter a sentence to convert into an Emoji Story.")
    } else {
      setEmojiFormError("");
      setStoryOutputEmojis([]);
      console.log(storyInputValue);
      getEmojis(storyInputValue);
    }
  }


  return(
    <section className={styles.emojiConverterWhole}>
      <div className={styles.emojiConverterWrapper}>
        {emojiFormError ? <p>{emojiFormError}</p> : ""}
        {!loading ? <p>{storyOutputSentence}</p> : ""}
        <div className={styles.emojiConverterStoryOutput}>{loading ? <p className={styles.emojiConverterLoading}>Generating story, please wait!</p> : ""}{storyOutputEmojis}</div>
        <form onSubmit={generateStory} className={styles.emojiConverterForm}>
          <input className={styles.emojiConverterFormInput} onChange={(e) => setStoryInputValue(e.target.value)} type="text" id="storyinput" name="storyinput" placeholder="Click to type"></input>
          <button className={styles.emojiConverterFormButton}>CONVERT</button>
        </form>
      </div>
    </section>
  )
}