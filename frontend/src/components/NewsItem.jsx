import React from 'react'
import axios from 'axios';
import { useUser } from './UserContext';
const NewsItem = (props)=> {
        const { userEmail } = useUser();
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        const handleNewsClick = async () => {
            try {
                // Send HTTP POST request to backend to update clicked news

                await axios.post('http://localhost:3001/updateClickedNews', { email: userEmail, clickedNewsTitle: title });

                console.log('Clicked news title sent to backend for update.');
            } catch (error) {
                console.error('Error updating clicked news:', error.message);
            }
        };

        return (
            <div className="my-3">
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }> 
                        <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title" onClick={handleNewsClick} >{title}  </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
                    
}

export default NewsItem