import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./createPost.scss";
import { Form, useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagPreview from "./TagPreview";
import {
  IconAlertOctagon,
  IconBrandGithub,
  IconPaperclip,
  IconTagsFilled,
  IconX,
} from "@tabler/icons-react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/Loaders/Loader";
const CreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [error, setError] = useState(""); //client side error
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(""); //current input tag.
  const [git, setGit] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentType , setAttachmentType] = useState(null);
  const [options, setOptions] = useState("tags"); //Tags, or GitHub
  const attachmentRef = useRef(null);
  const tagsRef = useRef(null);

  const MAX_FILE_SIZE = 1024 * 1024 * 8; //only 8MB allowed;

  useEffect(() => {
    //short cut to add tags
    document.addEventListener("keydown", handleAddTag);
    return () => {
      //clean up function to remove when this page is not mounted
      document.removeEventListener("keydown", handleAddTag);
    };
  }, [tags]);

  const handleAddTag = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (
        document.activeElement == tagsRef.current &&
        tagsRef.current.value != ""
      ) {
        //first check if it exist already, dont allow duplicate tags
        const value = tagsRef.current.value.toLowerCase(); //tags are case insensitiveS
        if (!tags.includes(value)) {
          setTags((prevTags) => [...prevTags, value]);
        }
        setTag("");
      }
    }
  };
  const onAttachmentChange = (e) => {
    console.log(e.target.files[0],"FILE")
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > MAX_FILE_SIZE) {
        toast.warn("File exceeded 8mb");
      } else{ 
        if (e.target.files[0].type.startsWith("image")) setAttachmentType('image')
        if (e.target.files[0].type.startsWith("video")) setAttachmentType('video')
        setAttachment(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
  const changeGit = (e) => {
    setGit(e.target.value);
  };
  const changeTag = (e) => {
    setTag(e.target.value);
  };

  const removeAttachment = () => {
    setAttachment(null); //remove preview;
    attachmentRef.current.value = "";
  };
  const deleteTag = (name) => {
    setTags(tags.filter((a) => a != name));
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("body", e.target.body.value);
    // console.log("BODY IS",e.target.body.value);
    if (attachment) data.append("attachment", e.target.attachment.files[0]); //attachment
    if (tags.length > 0) {
      tags.forEach((tag) => data.append("tags", tag));
    }
    if (git) data.append("gitLink", git);

    createPostMutation.mutate(data);
  };
  const myF = useFetch();

  const createPostMutation = useMutation({
    mutationFn: (variables) =>
      myF("/posts", { method: "POST", body: variables }, false),
    onSuccess: () => {
      toast.success("Post created");
      queryClient.invalidateQueries(["feed"]); //refresh the feed
      navigate("/p/home");
    },
    onError: (error, variables, context) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="content new-post">
      <div>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <TextareaAutosize
            onChange={handleChangeText}
            className="textarea"
            name="body"
            required
            maxLength="2000"
            placeholder="Share whats happening.."
          />
          {attachment && (
            <div className="media-container">
              {attachmentType=="image" && <img src={attachment} alt="Unknown file format" />}
              {attachmentType=="video" && 
              <video controls>
                <source src={attachment} type={attachment.type}/>
                Your browser does not support the video tag.
              </video>}

              {/* <img src={attachment} alt="" /> */}
              
              <IconX onClick={removeAttachment} />
            </div>
          )}

          <div className="tags">
            {tags.map((tag, key) => (
              <TagPreview key={key} name={tag} deleteTag={deleteTag} />
            ))}
          </div>
          <div className="form-options">
            <div className="attachment-container">
              <label htmlFor="attachment">
                <IconPaperclip />
              </label>
              <input
                ref={attachmentRef}
                type="file"
                id="attachment"
                name="attachment"
                onChange={onAttachmentChange}
                accept=".png, .jpeg, .jpg, .gif, .mp4, .avi, .mov, .wmv, .mkv, .webm"
              />
            </div>

            <IconTagsFilled
              className={options == "tags" ? "selected" : ""}
              onClick={() => {
                setOptions("tags");
              }}
            />
            <IconBrandGithub
              className={options == "git" ? "selected" : ""}
              onClick={() => {
                setOptions("git");
              }}
            />

            <p>{text.length}/2000</p>
            <Loader loading={createPostMutation.isPending} />
            <button disabled={createPostMutation.isPending} type="submit">
              Post
            </button>
          </div>
          {options == "tags" ? (
            <>
              <p className="options-name">Tags:</p>
              <input
                ref={tagsRef}
                text="text"
                placeholder="Please Enter to push a new tag."
                value={tag}
                onChange={changeTag}
              />
            </>
          ) : (
            <>
              <p className="options-name">Post Repo (Optional):</p>
              <input
                onChange={changeGit}
                type="text"
                placeholder="Eg. www.github.com/user/project"
                value={git}
              />
            </>
          )}
        </Form>
        <p className="error-box">
          {error ? (
            <>
              <IconAlertOctagon size="18px" />
              {error}
            </>
          ) : (
            ""
          )}
        </p>
      </div>
      <div></div>
    </div>
  );
};
export default CreatePost;
