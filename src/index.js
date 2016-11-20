// Styling vue-material-* components

let jss

try {
  jss = require('jss').default
  const preset = require('jss-preset-default').default
  jss.setup(preset())
} catch (er) {
  // jss is not installed, this means that `jss` themes are not supported
  // only css-styling is now possible
  jss = null
}

const MixinFactory = (createTheme, defaultTheme) => {
  return {
    data () {
      return {
        // Stores the jss classes if installed:
        classes: null
      }
    },
    beforeMount () {
      this.createTheme()
    },
    methods: {
      createTheme () {
        const theme = this.theme || defaultTheme

        if (jss && theme) {
          // Since all the magic is happening inside the `beforeMount`
          // method this is 100% ssr-friendly.
          const stylesheet = jss.createStyleSheet(
            theme
          )

          this.classes = stylesheet.attach().classes
        }
      }
    },
    watch: {
      theme () {
        this.createTheme()
      }
    },
    props: {
      // Default prop to pass styles to:
      theme: Object
    },
    createTheme
  }
}

export default MixinFactory
