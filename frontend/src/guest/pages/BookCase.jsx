// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { listHistory, updateUserProgressStatusToDeleted,saveOrUpdateUserProgress  } from '../services/UserService';
// import { timeSince } from '../../utils/timeUtils';
// import { getStoryById } from '../services/HomeStoryService';
// import { Link } from 'react-router-dom';

// const BookCase = () => {
//   const [activeTab, setActiveTab] = useState('reading'); // Tab mặc định là 'reading'
//   const [history, setHistory] = useState([]);
//   const [storyDetails, setStoryDetails] = useState([]);
//   const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
//   const userId = token ? jwtDecode(token).userId : null;

//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (!userId) return; // Nếu không có userId, không thực hiện gọi API
//       try {
//         const response = await listHistory(userId);
//         setHistory(response.data);

//          // Initialize an array to store chapterCount and slug for each story
//          const details = [];

//          for (let item of response.data) {
//            const storyId = item.storyId;
//            const res = await getStoryById(storyId);
//            details.push({
//              storyId: storyId,
//              chapterCount: res.data.chapterCount,
//              slug: res.data.slug
//            });
//          }
 
//          setStoryDetails(details);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       }
//     };

//     fetchHistory();
//   }, [userId]);

//   const handleDeleteProgress = async (storyId, slug, chapterNumber) => {
//     try {
//       await updateUserProgressStatusToDeleted(userId, slug, chapterNumber);
//       setHistory((prevHistory) => prevHistory.filter(item => item.storyId !== storyId));
//     } catch (error) {
//       console.error("Error updating progress status:", error);
//     }
//   };

//   const handleUpdateProgress = async (storyId, slug, chapterNumber) => {
//     try {
//       await saveOrUpdateUserProgress(userId, slug, chapterNumber);
//       setHistory(prevHistory => prevHistory.map(item =>
//         item.storyId === storyId ? { ...item, chapterNumber } : item
//       ));
//     } catch (error) {
//       console.error("Error updating progress:", error);
//     }
//   };

//   return (
//     <main className='main-sub'>
//         <div className="bookcase container">
//             <div className="tabs">
//                 <button 
//                 className={activeTab === 'reading' ? 'active' : ''} 
//                 onClick={() => setActiveTab('reading')}
//                 >
//                 Truyện Đang Đọc
//                 </button>
//                 <button 
//                 className={activeTab === 'bookmarked' ? 'active' : ''} 
//                 onClick={() => setActiveTab('bookmarked')}
//                 >
//                 Truyện Đánh Dấu
//                 </button>
//             </div>

//             <div className="tab-content">
//                 {activeTab === 'reading' && (
//                     <div className="reading-list">
//                         {readingList.length > 0 ? (
//                             readingList.map((story) => (
//                             <div key={story.id} className="story-book">
//                             <img src={story.cover} alt={story.title} className="story-cover" />
//                             <div className="story-details">
//                                 <Link to={`/story/${story.id}`}>
//                                 <div className='space-y-2'>
//                                     <h3 className="story-title">{story.title}</h3>
//                                     <p className="story-status">{story.status}</p>
//                                 </div>
//                                 </Link>
//                                 <div style={{ width: '200px' }}>
//                                 <p className="story-last-read">Lần đọc cuối: {story.lastRead}</p>
//                                 </div>
//                                 <div>
//                                 <button className="delete-button">
//                                     <i className="fa-regular fa-circle-xmark"></i>
//                                 </button>
//                                 </div>
//                             </div>
//                             </div>
//                         ))
//                         ) : (
//                             <p className="no-stories">Bạn chưa đọc truyện nào...</p>
//                         )}
//                     </div>
//                 )}
//                 {activeTab === 'bookmarked' && (
//                 <div>
//                     {/* Nội dung cho tab Truyện Đánh Dấu */}
//                     <h2>Truyện Đánh Dấu</h2>
//                     <p>Danh sách các truyện bạn đã đánh dấu...</p>
//                 </div>
//                 )}
//             </div>
//       </div>
//     </main>
//   );
// }

// export default BookCase;


import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { listHistory, updateUserProgressStatusToDeleted, saveOrUpdateUserProgress } from '../services/UserService';
import { getStoryById } from '../services/HomeStoryService';
import { timeSince } from '../../utils/timeUtils';

import { Link } from 'react-router-dom';

const BookCase = () => {
  const [activeTab, setActiveTab] = useState('reading'); // Tab mặc định là 'reading'
  const [history, setHistory] = useState([]);
  const [storyDetails, setStoryDetails] = useState([]);
  const token = localStorage.getItem('authToken'); // Lấy token từ Local Storage
  const userId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return; // Nếu không có userId, không thực hiện gọi API
      try {
        const response = await listHistory(userId);
        setHistory(response.data);

        const details = [];

        for (let item of response.data) {
          const storyId = item.storyId;
          const res = await getStoryById(storyId);
          details.push({
            storyId: storyId,
            chapterCount: res.data.chapterCount,
            slug: res.data.slug,
            cover: res.data.storyImg, // Giả sử API trả về ảnh bìa truyện
            title: res.data.title, // Giả sử API trả về tên truyện
          });
        }

        setStoryDetails(details);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleDeleteProgress = async (storyId, slug, chapterNumber) => {
    try {
      await updateUserProgressStatusToDeleted(userId, slug, chapterNumber);
      setHistory((prevHistory) => prevHistory.filter(item => item.storyId !== storyId));
    } catch (error) {
      console.error("Error updating progress status:", error);
    }
  };

  const handleUpdateProgress = async (storyId, slug, chapterNumber) => {
    try {
      await saveOrUpdateUserProgress(userId, slug, chapterNumber);
      setHistory(prevHistory => prevHistory.map(item =>
        item.storyId === storyId ? { ...item, chapterNumber } : item
      ));
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <main className='main-sub'>
      <div className="bookcase container">
        <div className="tabs">
          <button 
            className={activeTab === 'reading' ? 'active' : ''} 
            onClick={() => setActiveTab('reading')}
          >
            Truyện Đang Đọc
          </button>
          <button 
            className={activeTab === 'bookmarked' ? 'active' : ''} 
            onClick={() => setActiveTab('bookmarked')}
          >
            Truyện Đánh Dấu
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'reading' && (
            <div className="reading-list">
              {history.length > 0 ? (
                history.map((item) => {
                  const storyDetail = storyDetails.find(detail => detail.storyId === item.storyId);
                  return storyDetail ? (
                    <div key={item.storyId} className="story-book">
                      <img src={storyDetail.cover} alt={storyDetail.title} className="story-cover" />
                      <div className="story-details">
                        <Link to={`/truyen/${storyDetail.slug}/chuong/${item.chapterNumber}`}
                            onClick={() => handleUpdateProgress(item.storyId, storyDetail.slug, item.chapterNumber)}
                        >
                          <div className='space-y-2'>
                            <h3 className="story-title1">{storyDetail.title}</h3>
                            <p className="story-status">{`Đã đọc ${item.chapterNumber}/${storyDetail.chapterCount} chương`}</p>
                          </div>
                        </Link>
                        <div style={{ width: '200px' }}>
                          <p className="story-last-read">{timeSince(new Date(item.lastRead))}</p>
                        </div>
                        <div>
                          <button className="delete-button" onClick={() => handleDeleteProgress(item.storyId, storyDetail.slug, item.chapterNumber)}>
                            <i className="fa-regular fa-circle-xmark"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })
              ) : (
                <p className="no-stories">Bạn chưa đọc truyện nào...</p>
              )}
            </div>
          )}
          {activeTab === 'bookmarked' && (
            <div>
              {/* Nội dung cho tab Truyện Đánh Dấu */}
              <h2>Truyện Đánh Dấu</h2>
              <p>Danh sách các truyện bạn đã đánh dấu...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default BookCase;
