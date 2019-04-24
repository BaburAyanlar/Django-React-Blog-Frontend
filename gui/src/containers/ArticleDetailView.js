import React from 'react';
import axios from 'axios';
import CustomForm from '../components/Form.js'
import { Button, Card } from 'antd';

class ArticleDetail extends React.Component {

  state = {
    article: {}
  };

  componentDidMount() {
    const articleID = this.props.match.params.articleID;
    console.log(articleID);
    //console.log(this.props.match.params.articleID);
    axios.get(`http://127.0.0.1:8000/api/${articleID}`)
    .then(res => {
      this.setState({
        article: res.data
      });
    });
  }

  handleDelete = (event) => {
    const articleID = this.props.match.params.articleID;
    console.log(articleID);
    //console.log(this.props.match.params.articleID);
    axios.delete(`http://127.0.0.1:8000/api/${articleID}`);
    this.props.history.push('/');

  }

  render() {
    return (
      <div>
        <Card title={this.state.article.title}>
          <p> {this.state.article.content} </p>
        </Card>
        <CustomForm
        requestType="put"
        articleID={this.props.match.params.articleID}
        btnText="Update"/>
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">Delete</Button>
        </form>
      </div>
    )
  }
}

export default ArticleDetail;
