/**
 * Error classes
 */

class MissingParameterError extends Error {
  constructor(errorOpts) {
    super(errorOpts)
    this.name = 'MissingParameterError'
    this.message = `${errorOpts.expectedType.getClassName()} is missing parameter "${errorOpts.paramName}"`
  }
}

class ExpectedTypeError extends Error {
  constructor(errorOpts) {
    super(errorOpts)
    this.name = 'ExpectedTypeError'
    this.message = `Expected type ${errorOpts.expected.getClassName()} but got ${errorOpts.actual}`
  }
}

class DoesNotExist extends Error {
  constructor(errorOpts) {
    super(errorOpts)
    this.name = 'DoesNotExist'
    this.message = `Couldn't find resource for ${errorOpts.expected.getClassName()}`
  }
}

/**
 * Helper functions
 */

function throwIfMissing (expectedType, param, paramName) {
  if (param === '' && param !== undefined && param !== null) {
    return param
  } else {
    throw new MissingParameterError({expectedType, paramName})
  }
}

function typeCheck (expected, actual) {
  if (actual !== undefined && actual.hasOwnProperty('getClassName')) {
    if (actual.getClassName() !== expected.getClassName()) {
      throw new ExpectedTypeError({expected, actual})
    }
  }
  return actual
}

export {
  MissingParameterError,
  ExpectedTypeError,
  DoesNotExist,
  throwIfMissing,
  typeCheck
}