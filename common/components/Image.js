import { createComponent } from 'react-fela'

const Image = props => ({
  maxWidth: '100%',
  height: props.height || 'auto',
  width: props.width || 'auto',
  display: props.display || 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
})

export default createComponent(Image, 'img', ['src', 'alt'])
