import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.scss'

const QUOTE_LIST = [
  {
    text: 'Anyone who has ever made anything of importance was disciplined.',
    author: 'Andrew Hendrixson'
  },
  {
    text:
      'Don’t spend time beating on a wall, hoping to transform it into a door.',
    author: 'Coco Chanel'
  },
  {
    text: 'Creativity is intelligence having fun.',
    author: 'Albert Einstein'
  },
  {
    text:
      'Optimism is the one quality more associated with success and happiness than any other.',
    author: 'Brian Tracy'
  },
  {
    text:
      'Always keep your eyes open. Keep watching. Because whatever you see can inspire you.',
    author: 'Grace Coddington'
  },
  {
    text:
      'What you get by achieving your goals is not as important as what you become by achieving your goals',
    author: 'Henry David Thoreau'
  },
  {
    text: 'Sometimes you win, sometimes you learn.',
    author: 'John Maxwell'
  },
  {
    text: 'I destroy my enemies when I make them my friends',
    author: 'Abraham Lincoln'
  },
  {
    text: 'Don’t live the same year 75 times and call it a life.',
    author: 'Robin Scharma'
  },
  {
    text: 'You cannot save people, you can just love them.',
    author: 'Anais Nin'
  },
  {
    text: 'It wasn’t raining when Noah built the ark.',
    author: 'Howard Ruff'
  },
  {
    text:
      '“If you want to live a happy life, tie it to a goal, not to people or objects.',
    author: 'Albert Einstein'
  },
  {
    text: 'There is no way to happiness. Happiness is the way.',
    author: 'Thich Nhat Hanh'
  },
  {
    text:
      'Holding onto anger is like drinking poison and expecting the other person to die.',
    author: 'Buddha'
  },
  {
    text: 'Champions keep playing until they get it right.',
    author: 'Billy Jean King'
  },
  {
    text: 'You will succeed because most people are lazy.',
    author: 'Shahir Zag'
  },
  {
    text: 'Genius is 1% inspiration, 99% perspiration.',
    author: 'Thomas Edison'
  },
  {
    text: 'Do it with passion, or not at all.',
    author: 'Rosa Nouchette Carey'
  },
  {
    text: 'You must be the change you wish to see in the world.',
    author: 'Mahatma Gandhi'
  },
  {
    text:
      'Numbing the pain for a while will only make it worse when you finally feel it.',
    author: 'Albus Dumbledore'
  }
]

class RandomQuote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quoteList: QUOTE_LIST,
      quote: QUOTE_LIST[Math.floor(Math.random() * 20)]
    }
    this.getQuote = this.getQuote.bind(this)
  }
  getQuote () {
    this.setState({
      quote: this.state.quoteList[Math.floor(Math.random() * 20)]
    })
  }

  render () {
    return (
      <div id='quote-box'>
        <div id='quote'>
          <div id='text'>"{this.state.quote.text}"</div>
          <div id='author'>{this.state.quote.author}</div>
        </div>
        <div id='controls'>
          <button id='new-quote' onClick={this.getQuote}>
            New Quote
          </button>
          <button id='tweet-holder'>
            <a
              id='tweet-quote'
              href='https://twitter.com/intent/tweet'
              target='_blank'
            >
              Tweet Quote
            </a>
          </button>
        </div>
      </div>
    )
  }
}

const appTarget = document.querySelector('#app')

ReactDOM.render(<RandomQuote />, appTarget)
