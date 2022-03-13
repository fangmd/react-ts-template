import React from 'react'

const Block: React.FC = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16)
  const style = {
    width: '300px',
    height: '300px',
    backgroundColor: `#${color}`,
    flexShrink: 0,
  }

  return <div className='block' style={style}>{color}</div>
}

export default Block
