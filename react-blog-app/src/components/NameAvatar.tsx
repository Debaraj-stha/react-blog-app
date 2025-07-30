import React from 'react';
import { stringToColor } from '../helper/randomColorGenerator';

type NameAvatarProps = {
  name?: string;
};

const NameAvatar = ({ name = "John Doe" }: NameAvatarProps) => {
  if(!name) return null
  // Generate initials safely
  const nameInitials = name
    .split(" ")
    .filter(Boolean) //filter null value
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2); // Limit to max 2 initials

  return (
    <div
      className="rounded-full size-10 border items-center justify-center text-center flex text-white font-semibold shadow"
      style={{ background: stringToColor(name) }}
      title={name}
      aria-label={`Avatar for ${name}`}
    >
      <p>{nameInitials || "?"}</p>
    </div>
  );
};

export default NameAvatar;
