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

          console.log("Announcement data from main page", response.data);
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
    setAnnouncements((prevAnnouncements) => [
      ...prevAnnouncements,
      newAnnouncement,
    ]);
  };

  const updateAnnouncement = (newUpdatedAnnouncement) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.map((announcement) =>
        announcement.id === newUpdatedAnnouncement.id
          ? newUpdatedAnnouncement
          : announcement
      )
    );
  };

  return (
    <>
      <AnnouncementHeader addAnnouncement={addAnnouncement} />

      <AnnouncementTable
        announcements={announcements}
        selectedAnnouncement={selectedAnnouncement}
        setSelectedAnnouncement={setSelectedAnnouncement}
        setAnnouncements={setAnnouncements}
        updateAnnouncement={updateAnnouncement}
      />
    </>
  );
};

export default Announcement;
