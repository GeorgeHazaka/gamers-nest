import React from "react";

import { Link } from "react-router-dom";

import Avatar from "../../components/Avatar";
import styles from "../../styles/Profile.module.css";

// Profile component receives props as an argument
const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, image, owner } = profile;

  // Render the Profile component
  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
    </div>
  );
};

export default Profile;