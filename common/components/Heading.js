import { createComponent } from 'react-fela'

// Usage <Heading is="h1">Hello World</Heading>

const Heading = props => {
  let fontSize
  switch (props.is) {
    case 'h1':
      fontSize = '2.5rem'
      break
    case 'h2':
      fontSize = '2rem'
      break
    case 'h3':
      fontSize = '1.75rem'
      break
    case 'h4':
      fontSize = '1.5rem'
      break
    case 'h5':
      fontSize = '1.25rem'
      break
    case 'h6':
      fontSize = '1 rem'
      break
    default:
      fontSize = '1 rem' // no h1 tag created a plain div is created instead
  }
  return {
    marginBottom: props.theme.heading.marginBottom,
    fontFamily: props.theme.heading.fontFamily,
    fontSize: fontSize,
    fontWeight: props.theme.heading.fontWeight,
    fontStyle: props.theme.heading.fontWeight,
    lineHeight: props.theme.heading.lineHeight,
    color: props.theme.heading.color
  }
}

export default createComponent(Heading)
