import { useEffect } from "react"


export default function Home(props) {
    
  return (
    <>
    INDEX
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8,
  }
}