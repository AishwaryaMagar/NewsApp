import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {

  static defaultProps = {
    country : "in",
    Pagesize : 5,
    category : "general"
    

  }

  PropTypes = {
    country : PropTypes.string,
    Pagesize : PropTypes.number,
    category : PropTypes.string,
  }

  constructor(props){
    super(props);
    console.log("Hi this a constructor for News component");
    this.state = {
      articles : [],
      loading : true,
      page : 1,
      totalResults : 0
      
    }
    document.title = `${this.props.category} - News Monkey`;

  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ab87ffbe897441ea5a6a81d28e2ae42&page=${this.state.page}&pageSize=${this.props.Pagesize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);
    this.setState({articles: parsedData.articles, totalResults : parsedData.totalResults,
    loading : false});
    this.props.setProgress(100);


  }

  async componentDidMount(){
  
    this.updateNews();

  }

  handlePrevClick = async ()=>{

    this.setState({page: this.state.page - 1})
    this.updateNews();

  }

  handleNextClick = async ()=>{
  
    this.setState({page: this.state.page + 1})
    this.updateNews();

    }
  
  fetchMoreData = async ()=>{
    this.setState({page: this.state.page +1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3ab87ffbe897441ea5a6a81d28e2ae42&page=${this.state.page}&pageSize=${this.props.Pagesize}`;
    // this.setState({loading : true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults,
    loading : false});



  }
  
    
    
  

  render() {
    return (
      <div className='Container my-3'>
      
        <h2 className='text-center'>News Monkey - Top headlines on {this.props.category}</h2>

        { this.state.loading && <Spiner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spiner/>}
        >
        
        <div className='row'>
        {this.state.articles.map((element) => {
          return <div className='col-md-4' key={element.url}>
          <Newsitem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage?element.urlToImage:'https://www.hindustantimes.com/ht-img/img/2023/09/10/1600x900/ranbir_kapoor_alia_bhatt_brahmastra_bts_1694316518708_1694316518943.jpg'} newsUrl={element.url} author={element.author} date={element.publishedAt} source = {element.source.name} />
          </div>
        })}
          
        </div>
        </InfiniteScroll>

        {/* <div className='Container d-flex justify-content-between'>
        <button type="button" class="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.Pagesize))} class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
        
        
      </div>
    )
  }
}

export default News
