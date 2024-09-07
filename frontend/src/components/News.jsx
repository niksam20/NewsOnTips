
import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import NavBar from './NavBar';
import { useUser } from './UserContext'; 

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const { userEmail } = useUser();
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    // const updateNews = async ()=> {
    //     props.setProgress(10);
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    //     // const url = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
	//     // const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/in.json`

	//     setLoading(true)
    //     let data = await fetch(url);
    //     props.setProgress(30);
    //     console.log(data)
	//     let parsedData = await data.json()
    //     props.setProgress(70);
    //     setArticles(parsedData.articles)
    //     setTotalResults(parsedData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100);
    // }
    const updateNews = async (userEmail) => {
        props.setProgress(10);
        // let expressUrl = '';
        // const { userEmail } = useUser();
        let expressUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        if(props.category == 'business'){
            expressUrl = `http://localhost:3010/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'enterainment'){
          expressUrl = `http://localhost:3011/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'general'){
          expressUrl = `http://localhost:3016/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'health'){
          expressUrl = `http://localhost:3012/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'science'){
          expressUrl = `http://localhost:3013/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'sports'){
          expressUrl = `http://localhost:3014/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'technology'){
          expressUrl = `http://localhost:3015/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'newsForYou'){
          console.log(userEmail)
          expressUrl = `http://localhost:3020/news/${props.category}?userEmail=${userEmail}`;
          // expressUrl = `http://localhost:3020/news/your-category`;
        }
        
        setLoading(true);
      
        try {
          // Send a GET request to your Express application
          let response = await fetch(expressUrl);
      
          // Check if the request was successful (status code 200)
          if (response.ok) {
            props.setProgress(30);
            
            // Parse the response data
            let parsedData = await response.json();
      
            props.setProgress(70);
            
            // Update state with the fetched articles and total results
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
      
            props.setProgress(100);
          } else {
            throw new Error('Failed to fetch news');
          }
        } catch (error) {
          console.error('Error fetching news:', error.message);
          // Handle errors, such as displaying an error message to the user
        } finally {
          setLoading(false);
        }
      };
      




    useEffect(() => {
        document.title = `NewsOnTips - ${capitalizeFirstLetter(props.category)}`;
        updateNews(userEmail); 
        // eslint-disable-next-line
    }, [userEmail])


    // const fetchMoreData = async () => {   
    //    const url = `https://newsapirg/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // //    const url = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
	//         // const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/in.json`

	//     setPage(page+1) 
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     setArticles(articles.concat(parsedData.articles))
    //     setTotalResults(parsedData.totalResults)
    //   };

    const fetchMoreData = async () => {

        // const expressUrl = `http://localhost:3000/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        let expressUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        if(props.category == 'business'){
            expressUrl = `http://localhost:3010/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'enterainment'){
          expressUrl = `http://localhost:3011/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'general'){
          expressUrl = `http://localhost:3016/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'health'){
          expressUrl = `http://localhost:3012/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'science'){
          expressUrl = `http://localhost:3013/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'sports'){
          expressUrl = `http://localhost:3014/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'technology'){
          expressUrl = `http://localhost:3015/news/${props.category}?page=${page + 1}&pageSize=${props.pageSize}&country=${props.country}`;
        }
        else if(props.category == 'newsForYou'){
          expressUrl = `http://localhost:3020/news/${props.category}`;
        }
        
        setPage(page + 1);
      
        try {
          const response = await fetch(expressUrl);
          
          if (response.ok) {
            const parsedData = await response.json();
            
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
          } else {
            throw new Error('Failed to fetch more data');
          }
        } catch (error) {
          console.error('Error fetching more data:', error.message);
          // Handle errors, such as displaying an error message to the user
        }
      };
      
 
        return (
            <>
              <NavBar/>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsOnTips - Top {capitalizeFirstLetter(props.category)} Headlines.</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll> 
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News