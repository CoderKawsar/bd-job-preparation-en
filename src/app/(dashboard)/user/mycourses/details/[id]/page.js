"use client";
import { useGetMyCourseVedioPlaylistQuery } from "@/redux/api/videoApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import YoutubePlaylist from "./playlist";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/authApi";
import decryptLink from "@/helpers/decryptLink";

const Play = () => {
  // Disable right-click
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  document.addEventListener("keydown", function (e) {
    // Check if the pressed key is F12
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
    }
  });

  const params = useParams();
  const id = params?.id;
  const { data: course } = useGetMyCourseVedioPlaylistQuery(id);
  const [videos, setVideos] = useState([]);
  const [isPlaying, setPlaying] = useState(false);
  const apiKey = "AIzaSyBZ5EMCEWwIV7h7UVVbinObGvG3cFdLj58";
  const maxVideosToShow = 50;
  const extractPlaylistIdFromUrl = (url) => {
    const regex = /(?:list=)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        let allVideos = [];

        if (course && course.length > 0) {
          for (const playlist of course) {
            const playlistID = extractPlaylistIdFromUrl(
              decryptLink(playlist.playlist_link)
            );
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistID}&key=${apiKey}&maxResults=${maxVideosToShow}`
            );

            const playlistVideos = response.data.items.map((item) => ({
              title: item.snippet.title,
              videoId: item.snippet.resourceId.videoId,
            }));

            allVideos = [...allVideos, ...playlistVideos];
          }

          setVideos(allVideos);
          setSelectedVideo(allVideos[0]?.videoId);
          setCurrentPlaylistIndex(0);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setLoading(false);
      }
    };

    fetchAllPlaylists();
  }, [course, apiKey, maxVideosToShow]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const showPreviousPlaylist = () => {
    setPlaying(false);
    setCurrentPlaylistIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
    setSelectedVideo(
      videos[
        currentPlaylistIndex === 0
          ? videos.length - 1
          : currentPlaylistIndex - 1
      ]?.videoId
    );
  };
  const showNextPlaylist = () => {
    setPlaying(false);
    setCurrentPlaylistIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedVideo(
      videos[
        currentPlaylistIndex === videos.length - 1
          ? 0
          : currentPlaylistIndex + 1
      ]?.videoId
    );
  };
  const onVideoClick = (videoId, index) => {
    setPlaying(false);
    setSelectedVideo(videoId);
    setCurrentPlaylistIndex(index);
  };

  let opts;

  if (window.innerWidth >= 1024) {
    opts = {
      width: "100%",
      height: "650",
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        fs: 0,
        autohide: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        disablekb: 1,
      },
    };
  } else {
    opts = {
      width: "100%",
      height: "350",
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        fs: 0,
        autohide: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        disablekb: 1,
      },
    };
  }

  const { userId } = getUserInfo();
  const { data } = useGetSingleUserQuery(userId);

  /* =========================Custom Video Player ===================== */
  const [player, setPlayer] = useState(null);

  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const togglePlay = () => {
    if (player) {
      const playerState = player.getPlayerState();
      if (playerState === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleClick = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleSeek = (seconds) => {
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + seconds, true);
    }
  };

  /* ===================Custom volumn controllar ====================== */
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (newVolume) => {
    if (player) {
      player.setVolume(newVolume);
      setVolume(newVolume);
    }
  };

  /* full content redering and then display the page */
  const [isLoading, setLoading] = useState(true);

  const [contactNoPosition, setContactNoPosition] = useState({
    top: "1/2",
    left: "1/2",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate random top and left values
      const randomTop = Math.floor(Math.random() * 100) + 1 + "%";
      const randomLeft = Math.floor(Math.random() * 100) + 1 + "%";
      const randomRight = Math.floor(Math.random() * 100) + 1 + "%";
      const randomBottom = Math.floor(Math.random() * 100) + 1 + "%";

      setContactNoPosition({
        top: randomTop,
        left: randomLeft,
        right: randomRight,
        bottom: randomBottom,
      });
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-1 select-none">
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3 relative">
          <div className="static">
            <div className="bg-white  py-3 px-36 md:px-96 z-20 absolute top-0 left-0 right-0 text-green-500 font-bold flex items-center">
              <h2 className="md:px-12">TOP</h2>
              <img
                className="w-12"
                src="https://i.ibb.co/qNjGQnB/2592258.png"
                alt="secure"
              />
              <h2 className="md:px-12">SECURE</h2>
            </div>
          </div>

          <div className=" relative">
            <div className="bg-transparent top-0 bottom-0 md:bottom-1/2 md:py-80 absolute text-transparent">
              --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            </div>

            <YouTube
              key={selectedVideo || "defaultKey"}
              videoId={selectedVideo || ""}
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>

          <div className="grid grid-cols-3 justify-items-center justify-center content-center items-center m-4 border-2 border-dotted border-sky-500">
            {/* Custom volume controls with progress bar */}
            <div className="custom-volume-controls text-center">
              <small>Volume</small>
              <br />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                className="volume-slider ml-6 md:ml-0"
              />
            </div>

            {/* Custom play button */}
            <div>
              <div className="text-start ml-1">
                {isPlaying ? <small>Pause</small> : <small>Play</small>}
              </div>
              <img
                className="custom-play-button play-icon cursor-pointer w-7 md:w-10 mb-2"
                src={
                  isPlaying
                    ? "https://i.ibb.co/7NkRvHC/2088562.png"
                    : "https://i.ibb.co/1Rr5GRV/play-button.png"
                }
                alt={isPlaying ? "pause icon" : "play icon"}
                onClick={() => {
                  togglePlay();
                  handleClick();
                }}
              />
            </div>

            <div className="pl-1 md:pl-4">
              {/* Backward 10 Seconds Button */}
              <button
                onClick={() => handleSeek(-10)}
                className="bg-blue-500 text-white px-2 py-2 rounded mr-2"
              >
                -10s
              </button>

              {/* Forward 10 Seconds Button */}
              <button
                onClick={() => handleSeek(10)}
                className="bg-blue-500 text-white px-2 py-2 rounded"
              >
                +10s
              </button>
            </div>
          </div>

          <div className="bg-white  py-1 px-36 md:px-96 z-20 absolute bottom-44 left-0 right-0 text-green-500 font-bold flex items-center">
            <h2 className="md:px-12">TOP</h2>
            <img
              className="w-12"
              src="https://i.ibb.co/qNjGQnB/2592258.png"
              alt="secure"
            />
            <h2 className="md:px-12">SECURE</h2>
          </div>

          <h2 className="text-base">
            {" "}
            {videos && videos.length > 0 && videos[currentPlaylistIndex]?.title}
          </h2>

          <small
            className="z-50 absolute font-bold text-red-600 shadow-sm"
            style={{
              top: contactNoPosition.top,
              left: contactNoPosition.left,
              right: contactNoPosition.right,
              bottom: contactNoPosition.bottom,
              transform: "-translate(-50%, -50%)",
            }}
          >
            {data?.contact_no}
          </small>

          <div className="flex justify-between mt-4">
            <button
              onClick={showPreviousPlaylist}
              className="bg-orange-500 text-white px-4 py-2 rounded"
              disabled={currentPlaylistIndex === 0}
            >
              Prev
            </button>
            <button
              onClick={showNextPlaylist}
              className="bg-orange-500 text-white px-4 py-2 rounded"
              disabled={currentPlaylistIndex === videos.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <div className="overflow-y-auto max-h-96">
        <YoutubePlaylist
          videos={videos}
          course={course}
          currentPlaylistIndex={currentPlaylistIndex}
          onVideoClick={onVideoClick}
        />
      </div>
    </div>
  );
};

export default Play;
