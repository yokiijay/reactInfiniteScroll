import React, { Component, Fragment } from 'react'
import axios from 'axios'

//Components
import InfiniteScroll from 'react-infinite-scroll-component'

class Images extends Component {
	state = {
		images: [],
		count: 30,
		start: 1
	}

	componentDidMount(){
		const { count, start } = this.state
		axios.get(`/api/photos?count=${count}&start=&${start}`)
		.then(res => {
			this.setState((prevState)=>(
				{
					images: res.data
				}
			))
		})
		.catch(err => {console.log(err)})
	}

	render(){
		console.log(this.state)
		return(
			<Fragment>
				Images
			</Fragment>
		)
	}
}

export default Images