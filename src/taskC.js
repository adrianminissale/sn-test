import { transform, calculate } from "./common.js"

const expressions = []

const closeExpression = ex => {
  let open = 0
  let close = 0

  ex.split('').map(e => {
    e === '(' ? ++open : null
    e === ')' ? ++close : null
  })

  return open !== close
}

const validate = () => {
  const ex = input.value

  error.style.display = 'none'
  btn.disabled = false

  // Validate operator at end
  if ( ['+', '−', '∗', '/'].some(el => ex.split('').pop().includes(el)) ) {
    error.style.display = 'block'
    btn.disabled = true
  }
  // Validate operator open and close
  if ( ( ex.indexOf('sin(') === 0 || ex.indexOf('cos(') === 0 || ex.indexOf('tan(') === 0 ) && ex.split('').pop() !== ')' ) {
    error.style.display = 'block'
    btn.disabled = true
  }
  //
  if ( closeExpression( ex ) ) {
    error.style.display = 'block'
    btn.disabled = true
  }
}

const show = () => {
  const expression = input.value

  if (expression) {
    const transformed = transform( expression )
    const result = calculate( transformed )
    expressions.push( `${expression}: ${result}` )
    const expsToHtml = expressions.slice(-5).reverse().join().replaceAll(',', '</br>')
    document.getElementById( 'expressions' ).innerHTML = expsToHtml
  }
}

const error = document.getElementById( 'error' )

const input = document.getElementById( 'input' )
input.addEventListener( 'keyup', validate )

const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', show )
