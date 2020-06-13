import React from 'react'

export const stringBreaker = (str) =>
  str
    .trim()
    .split('\n')
    .map((text, i, arr) => (
      <React.Fragment key={text.slice(6)}>
        {text}
        {i !== arr.length ? <br /> : null}
      </React.Fragment>
    ))
