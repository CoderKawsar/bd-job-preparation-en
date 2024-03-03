import React from "react";

const YoutubePlaylist = ({
  videos,
  course,
  currentPlaylistIndex,
  onVideoClick,
}) => {
  return (
    <div>
      <div>
        <div className="bg-white">
          <h5 className="text-2xl">
            {course && course.length > 0 && course[currentPlaylistIndex]?.title}
          </h5>
        </div>

        <ul>
          {videos.map((video, index) => (
            <div key={index}>
              <p
                className={`cursor-pointer py-2 px-6 rounded-md border-b border-blue-300  text-lg ${
                  currentPlaylistIndex === index ? "bg-blue-300" : ""
                } `}
                onClick={() => onVideoClick(video.videoId, index)}
              >
                {index + 1}) {video.title}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YoutubePlaylist;
