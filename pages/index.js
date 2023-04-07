import Layout from "@/components/Layout/Layout"
import EmojiConverter from "@/components/EmojiConverter"

export default function Home() {
  
  return (
    <Layout pageTitle="EmojiStory" pageDescription="EmojiStory is a fun tool you can use to convert your sentences into emojis. Where most converters just turn words into matching emojis, this tool turns your whole sentence into a string of emojis that make sense as an overall story.">
      <EmojiConverter></EmojiConverter>
    </Layout>
  )
}
