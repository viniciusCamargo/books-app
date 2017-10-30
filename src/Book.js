import React, { Component } from 'react'
import { slugify } from 'voca'
import { Link } from 'react-router-dom'
import { get } from 'axios'

import { Loader } from './App'
import { BookImage } from './Books'
import { results as books } from './livros.json'


const GoodReadsRating = ({ rating }) => (
  <p style={{ whiteSpace: 'nowrap' }}>
    { rating
      ? `Média GoodReads: ${rating}`
      :  <Loader  className='loader rating' /> }
  </p>
)

const getReviews =  async (isbn) => {
  try {
    const { data } = await get(`https://goodreadsapi-rvywbtrvfa.now.sh/book/review_counts.json?key=w9G0bcdyDMu7XIvNWjC0Q&isbns=${isbn}`)

    return data['books'][0]['average_rating']
  } catch (error) {
    console.error(error)
  }
}

export default class Book extends Component {
  async componentDidMount () {
    const { params } = this.props['match']
    const [book] = books.filter((b) => slugify(b['name']) === params['book'])

    this.setState({ isAvailable: true, ...book })

    const goodReadsRating = await getReviews(book['isbn'])

    goodReadsRating
      ? this.setState({ goodReadsRating })
      : this.setState({ goodReadsRating: 'Not Available' })
  }

  render () {
    const { isAvailable, name, cover, author, edition, isbn, totalRatings, numRatings, goodReadsRating } = this['state']

    return isAvailable ? (
      <section className='container'>
        <Link to='/' className='button button-small'>
          Go Back
        </Link>

        <h2>{name}</h2>

        <main>
          <section className='row'>
            <div className='column'>
              <BookImage src={cover['url']} alt={name} />
            </div>

            <div className='column'>
              <h4>{author}</h4>
              <p>Edition: {edition}</p>
              <p>ISBN: {isbn}</p>

              <div className='row'>
              <div className='column'>
                <p>Média TAG: {(totalRatings/numRatings).toFixed(2)}</p>
              </div>

              <div className='column'>
                <GoodReadsRating rating={goodReadsRating} />
              </div>
              </div>
            </div>
          </section>
        </main>
      </section>
    ) : <Loader />
  }

  state = { isAvailable: false }
}
