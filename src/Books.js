import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { slugify } from 'voca'

import { results as books } from './livros.json'
import sortBooks from './sort'
import { Loader } from './App'

export class BookImage extends Component {
  handleImageLoaded = () => {
    this.setState((prevState) => ({ loading: !prevState['loading'] }))
  }

  render () {
    const { src, alt } = this['props']
    const { loading } = this['state']

    return (
      <div className='column'>
        { loading && <Loader /> }
        <img
          alt={alt}
          onLoad={this.handleImageLoaded}
          style={loading ? { display: 'none' } : {}}
          src={src} />
      </div>
    )
  }

  state = { loading: true }
}

const Book = ({ objectId, author, edition, name, cover }) => (
  <Link key={objectId} to={slugify(name)}>
    <section className='book row'>
      <div className='column'>
        <h4>{name}</h4>
        <p>Edition: {edition}</p>
        <p>Author: {author}</p>
      </div>
      <BookImage src={cover['url']} alt={name} />
    </section>
  </Link>
)

export default class Posts extends Component {
  componentDidMount () {
    this.setState({ books: sortBooks(books), loading: false })
  }

  render () {
    const { loading, books } = this['state']

    return (
      <section className='container'>
        <h2>Books</h2>

        <main>
          { loading ? <Loader /> : books.map(Book) }
        </main>
      </section>
    )
  }

  state = { loading: true }
}
