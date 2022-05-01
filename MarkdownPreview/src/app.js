import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.scss'

const marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

const lexer = new marked.Lexer()

let INITIAL_INPUT = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

class MarkdownPreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: INITIAL_INPUT,
      markedDown: marked(INITIAL_INPUT)
    }
    // Change code below this line
    this.handleChange = this.handleChange.bind(this)
    // Change code above this line
  }
  // Change code below this line
  handleChange (e) {
    console.log(marked('<h1>Hello</h1>'))
    this.setState({
      input: e.target.value,
      markedDown: marked(e.target.value)
    })
  }
  // Change code above this line
  render () {
    return (
      <div className='container'>
        <h1 className='text-center'>Markdown Preview</h1>
        <div className='row'>
          <div className='col-md-6'>
            <h4>Editor</h4>
            <textarea
              id='editor'
              value={this.state.input}
              onChange={this.handleChange}
            />
          </div>
          <div className='col-md-6'>
            <h4>Preview</h4>
            <div
              id='preview'
              dangerouslySetInnerHTML={{ __html: this.state.markedDown }}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}
const appTarget = document.querySelector('#app')

ReactDOM.render(<MarkdownPreview />, appTarget)
