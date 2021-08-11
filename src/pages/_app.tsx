import { Header } from '../components/Header/index'
import '../styles/global.scss'

import styles from '../styles/app.module.scss'
import { Player } from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext';
import { LayerContextProvider } from '../contexts/PlayerContext';
import Episode from './episodes/[slug]';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  return (
  <LayerContextProvider>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  </LayerContextProvider>
  );
}

export default MyApp
