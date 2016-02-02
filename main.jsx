
import React from 'react';
import ReactDOM from 'react-dom';

import {getBooks} from './components/booksFetcher.js';

import {BooksHeader} from './components/header/header.jsx';
import {BooksList} from './components/booksList/booksList.jsx'

import "./style.css";

class Main extends React.Component {

    state = {
        books: [],
        error: ''
    };

    constructor(props) {
        super(props);

        getBooks()
            .then((books) => {
                this.setState({
                    books: books,
                    error:''
                })
            })
            .catch(function(err) {
                console.log(err);
                this.setState({error: err});
            });
    }

    render() {
        let contentBloc = <BooksList books={this.state.books}/>;
        if(this.state.error !== '') {
            contentBloc = <div className="error">Erreur lors de la récupération des livres...</div>;
        }

        return <section>
                    <BooksHeader />
                    {contentBloc}
                </section>;
    }
}

ReactDOM.render(<Main/>, document.getElementById("main"));