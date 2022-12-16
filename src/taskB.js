import { transform, calculate } from "./common.js"

const evaluate = () => {
  const expression = document.getElementById( 'input' ).value

  if (expression) {
    const transformed = transform( expression )
    const result = calculate( transformed )
    document.getElementById( 'result' ).innerHTML = result
  }
}

const btn = document.getElementById( 'btn' )
btn.addEventListener( 'click', evaluate )
