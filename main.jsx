
import React from 'react';
import ReactDOM from 'react-dom';

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

        fetch('/mock.json')
            .then(function(response) {
                return response.json()
            })
            .then((json) => {
                this.setState({
                    books: this._extractBooksFromJSON(json),
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

    _extractBooksFromJSON(json) {
        let books = [];
        for(let module of json.modules) {
            if(module[0] === "list") {
                books.push(...module[1].books);
            }
        }
        return books;
    }
}

ReactDOM.render(<Main/>, document.getElementById("main"));