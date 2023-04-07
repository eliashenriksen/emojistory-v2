//Remember to remove console logs on cleanup

import { useState } from "react";
import axios from "axios";
import GraphemeSplitter from "grapheme-splitter";

export default function EmojiConverter() {

  const [storyInputValue, setStoryInputValue] = useState("");
  const [storyOutputEmojis, setStoryOutputEmojis] = useState([]);
  const splitter = new GraphemeSplitter();

  async function getEmojis(searchValue) {

    try {
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

      } catch (error) {
        console.log(error);
      }
    } 

  function generateStory(event) {
    event.preventDefault();
    setStoryOutputEmojis([]);

    console.log(storyInputValue);
    getEmojis(storyInputValue);
  }

  return(
    <section>
      <div>{storyOutputEmojis}</div>
      <form onSubmit={generateStory}>
        <input onChange={(e) => setStoryInputValue(e.target.value)} type="text" id="storyinput" name="storyinput"></input>
        <button>Go!</button>
      </form>
    </section>
  )
}