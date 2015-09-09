import cmify from 'cmify'
import message from './components/message'

const styles = cmify('./styles/one.css.js')
const html = `
<div class="${styles.foo}">
  ${message('here is some text')}
</div>
`

if (process.browser) {
  document.getElementById('root').innerHTML = html
}

module.exports = html
