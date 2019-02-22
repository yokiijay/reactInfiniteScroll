import React, { Component, Fragment } from 'react'
import axios from 'axios'
import uuidv4 from 'uuid/v4'

//Components
import InfiniteScroll from 'react-infinite-scroll-component'

class Images extends Component {
	state = {
		images: [],
		count: 24,
		start: 1,
		hasMore: true
	}

	componentDidMount(){
		const { count, start } = this.state
		axios.get(`/api/photos?count=${count}&start=${start}`)
		.then(res => {
			this.setState((prevState)=>(
				{
					images: res.data
				}
			))
		})
		.catch(err => {console.log(err)})
	}

	fetchImages= ()=>{
		// 获取新的一页
		this.setState((prevState)=>(
			{
				start: prevState.start + 1,
				count: 6
			}
		),()=>{ // 异步setState后axios请求新的一页数据然后更新state
			axios.get(`/api/photos?count=${this.state.count}&start=${this.state.start}`)
			.then(res => {
				this.setState((prevState)=>(
					{
						images: prevState.images.concat(res.data)
					}
				))
			})
			.catch(err => {console.log(err)})
		})
	}

	render(){
		console.log(this.state)
		return(
			<Fragment>
				<InfiniteScroll
				  dataLength={this.state.images.length} //This is important field to render the next data
				  next={this.fetchImages}
				  hasMore={this.state.hasMore}
				  loader={<h4>Loading...</h4>}
				  endMessage={
				    <p style={{textAlign: 'center'}}>
				      <b>Yay! You have seen it all</b>
				    </p>
				  }>
				  { this.state.images.map((image,index)=>(
				  	<img key={uuidv4()} className="single-photo" src={image.urls.thumb} alt=""/>
				  )) }
				</InfiniteScroll>
			</Fragment>
		)
	}
}

export default Images