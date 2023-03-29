// import { overrides } from "@/public/overrides";
import _ from 'lodash';
import axios from "axios";
import GraphemeSplitter from "grapheme-splitter";

//Initially I started out by having a set data sheet where certain words are overriden to specific emojis. This turned out to be unsustainable as there was far too much
//work involded in creating several different emoji overwrites for certain words.

//The new and updated solution is similar to the first one but takes advantage of AI. All I need to do now is to create a list of words that are to be overwritten, and I
//make an API call to chatGPT to return me a fitting emoji for the specific word, based on the given logic.

export default async function useWordOverride(wordToCheck) {

  const splitter = new GraphemeSplitter();

  async function callGpt(wordToCheck) {
    console.log(`TESTING GPT WORD: ${wordToCheck}`);

    const requestData = {
      "model": "text-davinci-003",
      "prompt": `Convert word into emoji.\n\nto: 👉➡️▶️\nin: 👉🔀➡️\non: 👆☝️⬆️\nunder: 👇⬇️🔽\nfrom: 👈⬅️↩️\nago: 🕰️⏰⌚\nwork: 🏢👷‍♂️👨‍⚕️\ndancing: 💃👯🕺\ngoing: 🏃‍♂️🚴‍♂️🚗\nflying: ✈️🚀🛬\nmoon: 🌚🌕🌜\nare: ❓❔🤔\ni: 🙆‍♂️🫠💁‍♂️\nwe: 👭👨‍👩‍👧👨‍👧‍👦\nyou: 🫵\nok: 👌👍✅\n${wordToCheck}:`,
      "temperature": 0.8,
      "max_tokens": 60,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "stop": ["\n"]
    }

    async function makeCall() {
      try {
        const response = await axios({
          method: 'post',
          url: "https://api.openai.com/v1/completions",
          data: requestData,
          headers: {
            "Authorization": "Bearer hidden"
          }
        });
        const data = response.data;
        console.log(data);

        const graphemes = splitter.splitGraphemes(data.choices[0].text);
        const filteredGraphemes = graphemes.filter((string) => string !== "" && string !== " ");

        returnEmojiHolder = _.sample(filteredGraphemes);
        console.log("Filtered grapheme single sample:", returnEmojiHolder);

      } catch (error) {
        console.log(error);
      }
    } 
    await makeCall();
  }

  let returnEmojiHolder = "";

  switch (wordToCheck) {
//Prepositions
    case "in":
    case "at":
    case "by":
    case "beside":
    case "across":
    case "through":
    case "to":
    case "into":
    case "towards":
    case "since":
    case "for":
    case "past":
    case "till":
    case "untill":
    case "there":
    case "under":
    case "below":
    case "here":
    case "on":
    case "over":
    case "above":
    case "onto":
    case "ago":
    case "from":
    case "before":
//Verbs
    case "going":
    case "driving":
    case "flying":
    case "riding":
    case "are":
//Conjunctions
    case "and":
//Pronouns
    case "i":
    case "we":
    case "you":
      await callGpt(wordToCheck);
      console.log(returnEmojiHolder);
      // returnEmojiHolder = _.sample(overrides.we);
      break

//Default Return
    default:
      return wordToCheck;
  }

  return returnEmojiHolder;
}