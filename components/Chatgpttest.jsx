import axios from "axios";

export default function ChatGpttest() {

  function callGpt() {
    console.log("TESTING GPT");

    const requestData = {
      "model": "text-davinci-003",
      "prompt": "Convert word into emoji.\n\nTo: 👉➡️ \nCar: 🚓🚗🏎️ \nHim: 🤵🧔 \nHer: 👩 \nBanana: 🍌",
      "temperature": 0.8,
      "max_tokens": 60,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "stop": ["\n"]
    };

    async function makeCall() {
      try {
        const response = await axios({
          method: 'post',
          url: "https://api.openai.com/v1/completions",
          data: requestData,
          headers: {
            "Authorization": "Bearer bearer-goes-here"
          }
        });
        const data = response.data;
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    } 
    makeCall();
  }

  return(
    <button onClick={callGpt}>call gpt</button>
  )
}