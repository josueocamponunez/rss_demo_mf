import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './App.css';

const App = () => {
  const [rssData, setRssData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('eng');
  const currentDate = format(new Date().toLocaleDateString(), "EEE, dd MMMM yyyy");

  // Fetch the RSS feed data when the component mounts or when the language changes
  useEffect(() => {
    axios.get(`http://localhost:8080/api/rss?lang=${language}`)
      .then((response) => {
        setRssData(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching RSS data:', error);
        setLoading(false);
      });
  }, [language]);

  // Switch language (eng | esp)
  const switchLanguage = (lang) => {
    setLanguage(lang);
    axios.get(`http://localhost:8080/api/rss?lang=${lang}`)
        .then((response) => {
          setRssData(response.data.items);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching RSS data:', error);
          setLoading(false);
        });
    setLoading(true);
  };

  return (
    <div>
      <div className="header">
        <div className="contenido">
          <div className="date">{currentDate}</div>
            <div><img src="tnyt2.png" className="nyt"/></div>
            <div className="language-switcher">
              <button onClick={() => switchLanguage('eng')}>ENG</button>
              <button onClick={() => switchLanguage('esp')}>ESP</button>
            </div>
          </div>
      </div>
      <hr className="mi-linea"></hr>
      <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
          <div className="article">
            {rssData.map((item, index) => (
                <div className="divi" onClick={() => window.open(item.link, "_blank")} style={{ cursor: "pointer" }}>
                  <div key={index} class="text">
                    <div className="date">{format(item.pubDate, "MMMM dd, yyyy")}</div>
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
                    <div className="autor">{item.creator}</div>
                  </div>
                  <img src={item.mediaUrl} alt="Imagen" />
                </div>
            ))}
          </div>
      )}
      </div>
    </div>
  );
}

export default App;
