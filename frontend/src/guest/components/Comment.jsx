import React, { useState, useEffect } from 'react';
import { timeSince } from '../../utils/timeUtils';
import { createComment, getCommentsByStoryId, deleteComment } from '../services/CommentService';
import { toast } from 'react-toastify';

const Comment = ({ storyId, chapterId, userId,userName }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showDeleteMenu, setShowDeleteMenu] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByStoryId(storyId);
        setComments(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [storyId, chapterId]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      toast.error("Bình luận không được để trống.");
      return;
    }

    if (userId) {
      const commentDTO = {
        storyId,
        chapterId,
        userId,
        commentText,
      };
      console.log(commentDTO);

      try {
        await createComment(commentDTO);
        setComments([...comments, {
          commentId: Date.now(),
          userName: userName,
          createdAt: new Date(),
          commentText,
          chapterName: 'Chương hiện tại'
        }]);
        setCommentText("");
        toast.success("Bình luận của bạn đã được gửi!");
      } catch (error) {
        console.error('Error submitting comment:', error);
        toast.error("Đã xảy ra lỗi khi gửi bình luận.");
      }
    } else {
      toast.error("Bạn phải đăng nhập để bình luận!");
    }
  };

  const handleDeleteClick = (commentId) => {
    setShowDeleteMenu(showDeleteMenu === commentId ? null : commentId);
  };

  const onDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.commentId !== commentId));
      setShowDeleteMenu(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error("Đã xảy ra lỗi khi xóa bình luận.");
    }
  };

  return (
    <div className="tab-content container story-detail">
        <div className="tab-pane fade show active">
        <div className="comment-section">
            <textarea
            placeholder="Bình Luận..."
            value={commentText}
            onChange={handleCommentChange}
            rows={4}
            cols={50}
            style={{ background: '#000', color: '#fff' }}
            />
            <div className="button-container" style={{justifyContent:'flex-end',margin:'4px'}}>
            <button onClick={handleCommentSubmit} className="submit-button">
                Gửi Bình Luận
            </button>
            </div>
        </div>

        <div className="comments-list">
            {comments.length > 0 ? (
            comments.map((c) => (
                <div key={c.commentId} className="comment-item">
                <div className="comment-header">
                    <strong>{c.userName}</strong> <span>{timeSince(new Date(c.createdAt))}</span>
                    {c.userId === userId && (
                    <div className="ellipsis-menu">
                        <button className="ellipsis-button" onClick={() => handleDeleteClick(c.commentId)}>
                        ...
                        </button>
                        {showDeleteMenu === c.commentId && (
                        <div className="delete-menu">
                            <button onClick={() => onDeleteComment(c.commentId)}>Xóa</button>
                        </div>
                        )}
                    </div>
                    )}
                </div>
                <div className="comment-body" dangerouslySetInnerHTML={{ __html: c.commentText.replace(/\n/g, '<br/>') }}></div>
                <div className="comment-footer">
                    <span>{c.chapterName}</span>
                </div>
                </div>
            ))
            ) : (
            <p>Chưa có bình luận nào.</p>
            )}
        </div>
        </div>
    </div>
  );
};

export default Comment;
