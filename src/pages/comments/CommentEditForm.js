import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  // Function to handle content changes in the textarea
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Function to handle comment edit submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a request to update the content of the comment
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      // Update the comments list with the edited comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              content: formContent.trim(),
              updated_at: "now",
            }
            : comment;
        }),
      }));
      // Hide the edit form after successful submission
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    // Comment edit form
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;