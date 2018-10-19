import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import StoriesResults from './components/stories-wrapper';
import CommentSection from './components/comments-section';
import { getTopStories } from './lib/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await this.props.getTopStoryIDs();
    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return 'Loading...';
    }

    return (
      <div className="App">
        <div className="app-header-wrapper">
          <div className="header-right">{'Hackernews Stories and Comments Demo App'}</div>
        </div>
        <div className="content-area">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={StoriesResults} />
              <Route path="/story/:storyID" component={CommentSection} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    results: state.results
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTopStoryIDs: () => {
      return dispatch(getTopStories());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
