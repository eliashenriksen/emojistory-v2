//Remember to remove console logs on cleanup

import { useState } from "react";
import axios from "axios";
import { OPENAI_BASE_URL } from "@/constants/api";
import GraphemeSplitter from "grapheme-splitter";

export default function Backbone() {

  const [storyInputValue, setStoryInputValue] = useState("");
  const [storyOutputEmojis, setStoryOutputEmojis] = useState([]);
  const splitter = new GraphemeSplitter();

  async function getEmojis(searchValue) {

      const requestData = {
      "model": "text-davinci-003",
      "prompt": `Convert sentence into emoji.\n\ngoing to work: 🚴‍♂️👉 🏢\ngoing to work: 🛵➡️ 👷‍♂️\ngoing to work: 🚗▶️ 👨‍⚕️\ndancing on the moon: 💃👆🌚\ndancing on the moon: 👯☝️🌜\ndancing on the moon: 🕺⬆️🌕\ndriving to the forest: 🚙➡️🌲\nflying to mars: 🚀⏩🪐\neating lunch at school: 🍴📍🏫\nplaying videogames: 🎮🕹️\nsplitting wigs: 🤺💇\n${searchValue}:`,
      "temperature": 0.8,
      "max_tokens": 60,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "stop": ["\n"]
      }

    try {
        const response = await axios({
          method: 'post',
          url: `${OPENAI_BASE_URL}/v1/completions`,
          data: requestData,
          headers: {
            "Authorization": "Bearer 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"
          }
        });
        const data = response.data;
        console.log(data);

        const graphemes = splitter.splitGraphemes(data.choices[0].text);
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
    <>
      <div>{storyOutputEmojis}</div>
      <form onSubmit={generateStory}>
        <input onChange={(e) => setStoryInputValue(e.target.value)} type="text" id="storyinput" name="storyinput"></input>
        <button>Go!</button>
      </form>
    </>
  )
}