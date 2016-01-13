import React from 'react';
import './styles/booksList.css';

class Book extends React.Component {
    render() {
        //console.log(this.props.book);
        let book = this.props.book;

        //console.log(authors);
        return <div className="bookList-book">
            <a href={`/book/${book.slug}/read`} className="book-cover"><img src={book.largeImage}/></a>
            <a href={`/book/${book.slug}?list=free-books`} className="book-title">{this.props.book.shortTitle}</a>
            <Authors authors={book.authors}/>
            <Readers readers={book.readers}/>
            <a href={`/book/${book.slug}?list=free-books`} className="book-read-btn">Lire</a>
        </div>;
    }
}

class Readers extends React.Component {
    static defaultProps = {
        readers: []
    };

    render() {
        let readersIcons = this.props.readers.slice(3).map((reader) => {
            return  <div className="book-reader" key={reader.id}>
                        <a href={`/${reader.username}`} className="book-reader-avatar"><img src={reader.avatar} title={reader.name}/></a>
                    </div>
        });
        return <div className="book-readers">{readersIcons}</div>;
    }
}

class Authors extends React.Component {
    static defaultProps = {
        authors: []
    };

    render() {
        let nbOfAuthors = this.props.authors.length;

        if(nbOfAuthors > 0) {
            let authorsTags = this.props.authors.reduce((prev, author, index) => {
                let authorTag = <a href={`/author/${author.slug}`}>{author.name}</a>;

                if (index > 0 && index != nbOfAuthors - 1) {
                    return prev.concat([', ', authorTag]);
                } else if (index != 0) {
                    return prev.concat([' et ', authorTag]);
                } else {
                    return prev.concat([authorTag]);
                }
            }, []);

            return <div className="book-authors">par {authorsTags}</div>;
        }
        return null;
    }
}

export class BooksList extends React.Component {
    render() {
        if (this.props.books.length == 0) {
            return <div className="bookList-loading">Recherche de livres en cours...</div>;
        } else {
            let booksTags = this.props.books.map(function (book, index) {
                return <Book key={book.id} book={book}/>;
            });
            return <section className="bookList">{booksTags}</section>;
        }
    }
}