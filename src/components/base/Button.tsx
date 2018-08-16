import * as React from 'react';

export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4 rounded inline-flex items-center"
      onClick={onClick}
    >
      {children}
    </button>
  )
}