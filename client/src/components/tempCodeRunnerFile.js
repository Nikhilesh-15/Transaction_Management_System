import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScienceFiction() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScienceFiction();
  }, []);

  const fetchScienceFiction = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await axios.get('https://mxpertztestapi.onrender.com/api/sciencefiction');
      setStories(data);
    } catch (error) {
      setError('Failed to load science fiction stories');
      console.error('Error fetching science fiction:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ 
          fontSize: '24px', 
          color: '#667eea',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          Loading stories...
        </div>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Science Fiction Stories
      </h2>

      {stories.length === 0 ? (
        <p>No stories found.</p>
      ) : (
        <div className="stories-list">
          {stories.map((story) => (
            <div key={story._id} className="story-card" style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: '#fff'
            }}>
              <h3>{story.Title || 'Untitled'}</h3>
              <p><strong>Status:</strong> {story.Status || 'N/A'}</p>
              
              {story.Storyadvenure && story.Storyadvenure.Storytitle && (
                <div>
                  <h4>Story Adventure: {story.Storyadvenure.Storytitle}</h4>
                  {story.Storyadvenure.content && story.Storyadvenure.content.map((content, idx) => (
                    <div key={content._id || idx} style={{ marginTop: '15px' }}>
                      {content.Paragraph && content.Paragraph.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {story.Wordexplore && story.Wordexplore.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4>Word Exploration:</h4>
                  {story.Wordexplore.map((word, idx) => (
                    <div key={word._id || idx} style={{ marginBottom: '10px' }}>
                      <strong>{word.Storytitle}:</strong> {word.Storyttext}
                      {word.Synonyms && <p>Synonyms: {word.Synonyms}</p>}
                    </div>
                  ))}
                </div>
              )}

              {story.Brainquest && story.Brainquest.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  <h4>Brain Quest:</h4>
                  {story.Brainquest.map((quest, idx) => (
                    <div key={quest._id || idx} style={{ marginBottom: '15px' }}>
                      <p><strong>Q:</strong> {quest.Question}</p>
                      <ul>
                        {quest.Option && quest.Option.map((opt, optIdx) => (
                          <li key={optIdx}>{opt}</li>
                        ))}
                      </ul>
                      <p><strong>Answer:</strong> {quest.Answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScienceFiction;
