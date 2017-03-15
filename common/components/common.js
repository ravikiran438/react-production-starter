import React from 'react'
import { ThemeProvider } from 'react-fela'
import { connect } from 'react-redux'

const common = ({ themes }) => (
  WrappedComponent: Function,
) => {
  const Common = (
    {
      theme,
      themeName,
      ...props
    }: any,
  ) => (
    <ThemeProvider
      key={themeName} // Enforce rerender.
      theme={theme}
    >
      <WrappedComponent {...props} />
    </ThemeProvider>
  )
  return connect((state) => ({
    theme: themes[state.app.currentTheme] || themes.defaultTheme,
    themeName: state.app.currentTheme
  }))(Common)
}

export default common
