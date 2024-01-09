import { createContext, useContext, useState } from "react";

// Contexts for profile data and setter function
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Custom hooks for accessing profile data and setter function
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Provider component for managing profile data state
export const ProfileDataProvider = ({ children }) => {
  // State to store the profile data
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
  });

  // Provide the profile data and setter function to the context
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};