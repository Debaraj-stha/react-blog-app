import React from 'react'
import SocketProvider from '../Provider/SocketProvider'
import PeerProvider from '../Provider/PeerProvider'
import Collaboration from '../pages/Collaboration'

const CollaborationWithProvider = () => {
  return (
    <PeerProvider> 
      <SocketProvider>
        <Collaboration />
      </SocketProvider>
    </PeerProvider>
  );
};


export default CollaborationWithProvider
