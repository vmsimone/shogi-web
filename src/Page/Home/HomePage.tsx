import React from 'react'
import './HomePage.css';

/**
 * The home page component.
 */
const HomePage = () => {
  return (
    <div>
      <main role="main" aria-live="assertive">
        <h1>Welcome to the United States Shogi Federation!</h1>
      </main>
      <section id="about">
        <h2>About</h2>
        <p>
          While not the most popular game in the USA, this exciting, traditional strategy game from Japan has had fans from the United States since the early 1990s! We wanted to bring some of that excitement into the modern day, make it easier for experienced players to find each other, and offer new players and interested prospects an easy way to find shogi clubs and events in their local area. While not an official organization, we hope our efforts can help ease communication and make games more accessible to everyone. <br />
          Scroll down or use the links at the top to find a club, see the latest information, or learn more about shogi!
        </p>
      </section>
    </div>
  )
}

export default HomePage;