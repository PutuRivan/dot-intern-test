import React from "react";

export default function HeaderContent({ title, content }) {
  return (
    <div className='text-center'>
      <p className="text-muted-foreground text-sm mb-1">{title}</p>
      <p className='text-2xl font-bold'>{content}</p>
    </div>
  );
}
