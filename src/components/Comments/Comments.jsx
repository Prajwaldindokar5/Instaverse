import "./Comments.scss";

const Comments = ({ comments }) => {
  return (
    <div className="comments-info">
      <section className="comments-info-head">Comments</section>
      <section className="commentsInfo">
        {comments.map(({ comment, user, _id }) => {
          return (
            <div className="comment-info" key={_id}>
              <img src={user.photo} alt="" />
              <span className="username">{user.username}</span>
              <span className="comment">{comment}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Comments;
