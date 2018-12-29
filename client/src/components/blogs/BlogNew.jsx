// BlogNew shows BlogForm and BlogFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BlogForm from './BlogForm';
import BlogFormReview from './BlogFormReview';

class BlogNewClass extends Component {
  state = { 
    showFormReview: false
  };
  renderContent() {
    return this.state.showFormReview 
    ? <BlogFormReview 
        onCancel={() => this.setState({ showFormReview: false })}
      />
    : <BlogForm
        onBlogSubmit={() => this.setState({ showFormReview: true })}
      />
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export const BlogNew = reduxForm({
  form: 'blogForm'
})(BlogNewClass);
