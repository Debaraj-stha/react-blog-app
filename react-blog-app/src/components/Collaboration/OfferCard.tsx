import React from 'react';
import NameAvatar from '../NameAvatar';
import { useSocket } from '../../Provider/SocketProvider';


const OfferCard = () => {
    const{incomingOffer,onAccept,onReject}=useSocket()

  return (
    <div className="bg-gray-700 text-white rounded-xl p-5 shadow-lg max-w-md w-full space-y-4">
      <div className="flex items-center gap-4">
        {incomingOffer?.caller!.photo ? (
          <img
            src={incomingOffer?.caller.photo}
            alt={incomingOffer?.caller.name!||incomingOffer?.caller.email}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
        ) : <NameAvatar name={incomingOffer?.caller!.name!}/>}
        <div>
          <p className="text-lg font-semibold">Offer from: {incomingOffer?.caller!.name!}</p>
          <p className="text-sm text-gray-300">{incomingOffer?.caller!.email}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
