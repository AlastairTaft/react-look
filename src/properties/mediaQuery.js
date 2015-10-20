import throttle from '../utils/throttle'

let matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined

/**
 * Evaluates if a media condition is fulfilled by using window.matchMedia
 * NOTE: This won't work on server-side by default
 */
export default (property, styles, customKey, {Component}) => {
  // Check if browser supports window.matchMedia
  if (matchMedia !== undefined) {
    if (!Component._mediaQueryListener) {
      Component._mediaQueryListener = throttle(() => {
        Component.forceUpdate()
      }, 250)
      // Add a global resize listener to rerender media queries
      window.addEventListener('resize', Component._mediaQueryListener)

      // Remove the listener if the component unmounts to keep things clean
      let existingWillUnmount = Component.componentWillUnmount
      Component.componentWillUnmount = () => {
        existingWillUnmount && existingWillUnmount()
        window.removeEventListener('resize', Component._mediaQueryListener)
      }
    }
    return matchMedia(property.replace(customKey, '').trim()).matches ? styles : false
  } else {
    console.warn('Failed evaluating media query: ' + property + '. Your environment is not able to use window.matchMedia.');
  }
}