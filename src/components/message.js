import cmify from 'cmify'
const styles = cmify('../styles/two.jss.js')

export default (msg) => `<span class="${styles.pizza}">${msg}</span>`
