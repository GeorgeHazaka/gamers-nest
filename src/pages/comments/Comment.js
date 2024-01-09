import React, { useState } from "react";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    commentlike_id,
    commentlikes_count,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();

  // Check if the current user is the owner of the comment
  const is_owner = currentUser?.username === owner;

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      // Send a request to delete the comment
      await axiosRes.delete(`/comments/${id}/`);
      // Update post comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      // Update comments list by removing the deleted comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) { }
  };

  // Function to handle comment liking
  const handleLike = async () => {
    try {
      // Send a request to like the comment
      const { data } = await axiosRes.post("/comment_likes/", { comment: id });
      // Update comments list with the new like information
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? { ...comment, commentlikes_count: comment.commentlikes_count + 1, commentlike_id: data.id }
            : comment;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle comment unliking
  const handleUnlike = async () => {
    try {
      // Send a request to unlike the comment
      await axiosRes.delete(`/comment_likes/${commentlike_id}/`);
      // Update comments list by removing the like information
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? { ...comment, commentlikes_count: comment.commentlikes_count - 1, commentlike_id: null }
            : comment;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own comment!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : commentlike_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like comments!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {commentlikes_count}
        </div>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;