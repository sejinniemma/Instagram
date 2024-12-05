'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import ColorBtn from './ColorBtn';

export default function Singin({ providers, callbackUrl }) {
  return (
    <div>
      {Object.values(providers).map(({ name, id }) => (
        <ColorBtn
          key={id}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size='big'
        />
      ))}
    </div>
  );
}
