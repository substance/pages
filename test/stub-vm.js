/*
 ATTENTION: this is an unsafe VM implementation.
 Don't use this with untrusted code.
*/
class Script {

  constructor(code) {
    this.code = code
  }

  runInNewContext(ctx) {
    let symbols = Object.keys(ctx)
    let ExprFunction = Function.prototype.bind.apply(Function, [null].concat(symbols).concat(this.code));
    let f = new ExprFunction()
    let args = symbols.map((name) => {
      return ctx[name];
    })
    return f.apply(null, args);
  }

}

export { Script }