const operators = ['+', '−', '∗', '/', 'sin', 'cos', 'tan']
const jsOperators = ['+', '−', '∗', '/', 'Math.sin', 'Math.cos', 'Math.tan']

export const transform = ex => {
  ex = operators.map( (op, i) => {
    return ex = ex.replaceAll( op, jsOperators[i] )
  })
  return ex = ex.pop()
}

export const calculate = expression => {

  let lastBr, lastBrClose, currentExp, math, result

  if ( expression.lastIndexOf('(') > 0 ) {
    lastBr = expression.lastIndexOf('(') + 1
    lastBrClose = expression.slice( lastBr )
    lastBrClose = lastBr + lastBrClose.indexOf(')')

    currentExp = expression.slice( lastBr, lastBrClose )
    math = expression.slice( lastBr - 9, lastBr - 1 )
  } else {
    currentExp = expression
    math = null
  }

  if (currentExp.includes('+') && currentExp.split('').pop() !== '+') {
    currentExp = currentExp.split('+').reduce((res, val) => {
      return parseFloat(res) + parseFloat(val)
    })
  } else if (currentExp.includes('-') && currentExp.split('').pop() !== '-') {
    currentExp = currentExp.split('-').reduce((res, val) => {
      return parseFloat(res) - parseFloat(val)
    })
  } else if (currentExp.includes('*') && currentExp.split('').pop() !== '*') {
    currentExp = currentExp.split('*').reduce((res, val) => {
      return parseFloat(res) * parseFloat(val)
    })
  } else if (currentExp.includes('/') && currentExp.split('').pop() !== '/') {
    currentExp = currentExp.split('/').reduce((res, val) => {
      return parseFloat(res) / parseFloat(val)
    })
  }

  switch (math) {
    case 'Math.cos':
      result = Math.cos( currentExp )
      break;
    case 'Math.sin':
      result = Math.sin( currentExp )
      break;
    case 'Math.tan':
      result = Math.tan( currentExp )
      break;
    default:
      result = currentExp
      break;
  }

  if (expression.lastIndexOf('(') > 0) {
    expression = expression.slice(0, lastBr - 9) + result + expression.slice(lastBrClose + 1)
  } else {
    return expression = result.toString()
  }

  if (expression.includes('(') || expression.includes('+') || expression.includes('-') || expression.includes('*') || expression.includes('/')) {
    return calculate( expression )
  }

  return expression
}
