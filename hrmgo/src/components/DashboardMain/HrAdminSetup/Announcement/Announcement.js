// This is main page where i am displaying all things all announcement list in table

// The create button is present in announcement header by clicking it announcement create modal open

// when i successfully create a new announcement i want that newly created announcement must be shown here in table
import React from "react";
import AnnouncementHeader from "./AnnouncementHeader";
import AnnouncementTable from "./AnnouncementTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await getAPI(`/announcement`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setAnnouncements(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Announcement Data:", err);
      }
    };

    fetchAnnouncementData();
  }, []);

  const addAnnouncement = (newAnnouncement) => {
    console.log(
      "new Announcement from addAnnouncement function",
      newAnnouncement
    );
    setAnnouncements((prevAnnouncements) => [
      ...prevAnnouncements,
      newAnnouncement,
    ]);
  };

  return (
    <>
      <AnnouncementHeader addAnnouncement={addAnnouncement} />

      <AnnouncementTable
        announcements={announcements}
        selectedAnnouncement={selectedAnnouncement}
        setSelectedAnnouncement={setSelectedAnnouncement}
        setAnnouncements={setAnnouncements}
        addAnnouncement={addAnnouncement}
      />
    </>
  );
};

export default Announcement;
