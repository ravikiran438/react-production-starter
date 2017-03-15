import placeholderPrefixer from 'fela-plugin-placeholder-prefixer'
import validator from 'fela-plugin-validator'
import webPreset from 'fela-preset-web'
import fontRenderer from 'fela-font-renderer'
import { createRenderer } from 'fela'

const staticStyles = `
  ${/*
    From https://github.com/twbs/bootstrap/blob/v4-dev/dist/css/bootstrap-reboot.css
  */ ''}
  html {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    font-family: sans-serif;
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: inherit;
            box-sizing: inherit;
  }

  @-ms-viewport {
    width: device-width;
  }

  body {
    margin: 0;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.5;
    color: #292b2c;
    background-color: #fff;
  }

  [tabindex="-1"]:focus {
    outline: none !important;
  }

  hr {
    -webkit-box-sizing: content-box;
            box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: .5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  abbr[title],
  abbr[data-original-title] {
    text-decoration: underline;
    text-decoration: underline dotted;
    cursor: help;
    border-bottom: 0;
  }

  address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    margin-bottom: 0;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-bottom: .5rem;
    margin-left: 0;
  }

  blockquote {
    margin: 0 0 1rem;
  }

  dfn {
    font-style: italic;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -.25em;
  }

  sup {
    top: -.5em;
  }

  a {
    color: #0275d8;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  a:hover {
    color: #014c8c;
    text-decoration: underline;
  }

  a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):focus {
    outline: 0;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  pre {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
  }

  figure {
    margin: 0 0 1rem;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  a,
  area,
  button,
  [role="button"],
  input,
  label,
  select,
  summary,
  textarea {
    -ms-touch-action: manipulation;
        touch-action: manipulation;
  }

  table {
    border-collapse: collapse;
  }

  caption {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    color: #636c72;
    text-align: left;
    caption-side: bottom;
  }

  th {
    text-align: left;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  input[type="radio"],
  input[type="checkbox"] {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 0;
  }

  input[type="radio"]:disabled,
  input[type="checkbox"]:disabled {
    cursor: not-allowed;
  }

  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    -webkit-appearance: listbox;
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  legend {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-bottom: .5rem;
    font-size: 1.5rem;
    line-height: inherit;
    color: inherit;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    outline-offset: -2px;
    -webkit-appearance: none;
  }

  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }

  output {
    display: inline-block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none !important;
  }
`

const gibsonLight = [
  '/assets/fonts/gibson-light.woff',
  '/assets/fonts/gibson-light.woff2'
]

const gibsonRegular = [
  '/assets/fonts/gibson-regular.woff',
  '/assets/fonts/gibson-regular.woff2'
]

const gibsonSemiBold = [
  '/assets/fonts/gibson-semibold.woff',
  '/assets/fonts/gibson-semibold.woff2'
]

const corisandeLight = [
  '/assets/fonts/corisande-light.woff',
  '/assets/fonts/corisande-light.woff2'
]

const corisandeRegular = [
  '/assets/fonts/corisande-regular.woff',
  '/assets/fonts/corisande-regular.woff2'
]

const corisandeBold = [
  '/assets/fonts/corisande-bold.woff',
  '/assets/fonts/corisande-bold.woff2'
]

const devPreset = [
  validator({
    logInvalid: true,
    deleteInvalid: true
  })
]

const configureFela = (fontNode) => {
  const renderer = createRenderer({
    plugins: [
      placeholderPrefixer(),
      ...webPreset,
      ...(process.env.NODE_ENV !== 'production' ? devPreset : [])
    ],
    enhancers: [fontRenderer(fontNode)]
  })
  renderer.renderStatic(staticStyles)
  renderer.renderFont('Gibson Light', gibsonLight)
  renderer.renderFont('Gibson Regular', gibsonRegular)
  renderer.renderFont('Gibson SemiBold', gibsonSemiBold)
  renderer.renderFont('Corisande Light', corisandeLight)
  renderer.renderFont('Corisande Regular', corisandeRegular)
  renderer.renderFont('Corisande Bold', corisandeBold)

  return renderer
}

export default configureFela
