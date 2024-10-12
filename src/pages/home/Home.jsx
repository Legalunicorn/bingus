//Home page . ie Feed
import { useState } from "react";
import "./home.scss";
import PostCard from "../../components/postCard/PostCard";
import ProfilePreview from "../../components/profilePreview/ProfilePreview";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loaders/Loader";
import BadRequest from "../Error/BadRequest";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
  const myFetch = useFetch();
  const navigate = useNavigate();
  const [feedSort, setFeedSort] = useState("recent"); //or following

  function handleClick(postId) {
    navigate(`/p/posts/${postId}`);
  }

  const feedQuery = useQuery({
    queryKey: ["feed", "post"],
    queryFn: () => myFetch("/init"),
  });

  const {
    new_post = [],
    new_follower_posts = [],
    new_users = [],
    top_users = [],
  } = feedQuery.data || {};

  return (
    <div className="content" id="home-page">
      <div className="content-main">
        <div className="feed-options">
          <span
            onClick={() => setFeedSort("recent")}
            className={feedSort == "recent" ? "selected" : ""}
          >
            Recent
          </span>
          <span
            onClick={() => setFeedSort("following")}
            className={feedSort == "following" ? "selected" : ""}
          >
            Following
          </span>
        </div>
        {feedQuery.isLoading ? (
          <Loader loading={feedQuery.isLoading} />
        ) : feedQuery.isError ? (
          <BadRequest />
        ) : feedSort == "recent" ? (
          new_post.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              handleClick={() => handleClick(post.id)}
              pageQueryKey={["feed", "post"]}
            />
          ))
        ) : new_follower_posts.length === 0 ? (
          <p className="no-results">No following posts</p>
        ) : (
          new_follower_posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              handleClick={() => handleClick(post.id)}
              pageQueryKey={["feed", "post"]}
            />
          ))
        )}
      </div>
      <div className="content-side">
        {feedQuery.isLoading ? (
          <Loader loading={feedQuery.isLoading} />
        ) : (
          <>
            <div className="side-content-box">
              <p>Latest users</p>
              {new_users.map((user) => (
                <ProfilePreview key={user.id} user={user} />
              ))}
            </div>
            <div className="side-content-box">
              <p>Most followed</p>
              {top_users.map((user) => (
                <ProfilePreview key={user.id} user={user} />
              ))}
            </div>
          </>
        )}
        iasdassdaondaond Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Nemo vero magni, modi impedit, maxime amet consequatur porro quas
        accusamus harum quo ea? Totam aut sapiente sequi incidunt necessitatibus
        nemo nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Est, sit cupiditate eligendi hic neque, dolorum, incidunt consectetur
        perferendis saepe ipsa voluptatibus quaerat harum iure dicta rem maxime
        aperiam sapiente inventore! Ad corrupti atque hic incidunt, eligendi
        expedita laudantium ex odit nesciunt nisi voluptatem veritatis similique
        praesentium non quam sint error ut fugiat totam, quod quis, impedit
        corporis at eaque. Ratione quis amet illum aliquid neque tempora
        molestias, a rerum, perspiciatis laudantium eius, nesciunt recusandae
        numquam iure! Quo commodi deserunt minus ullam. Quaerat tenetur, quasi
        eaque voluptates officia incidunt. Necessitatibus, vel asperiores ipsum
        enim obcaecati vero iste cum. Reiciendis, repellendus fuga?
      </div>
    </div>
  );
};

export default Home;
