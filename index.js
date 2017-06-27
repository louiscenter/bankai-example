var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')

var app = choo()

app.use(function (state, emitter) {
  state.count = 0

  emitter.on('increment', function () {
    state.count = state.count + 1
    emitter.emit('render')
  })
})

app.route('/', home)

document.body.appendChild(app.start())

function home (state, emit) {
  var style = css`
    :host {
      background: pink;
      font-family: Helvetica;
      display: table;
      padding: 1rem;

      h1 {
        color: green;
        margin: 0 0 1rem 0;
      }

      button {
        background: none;
        border: 1px solid;
        color: blue;
        font-family: Helvetica;
      }
    }
  `
  return html`
    <div class=${style}>
      <h1>Counter: ${state.count}</h1>
      <button onclick=${onclick}>
        Increment
      </button>
    </div>
  `

  function onclick () {
    emit('increment')
  }
}
