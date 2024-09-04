import moment from 'moment';

function CommentBox({ video, loaded }) {
  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-4">
        {(loaded===true)?<div>
      <h2 className="text-2xl font-bold text-white py-4 px-6">Comments</h2>
      <div className="p-6">
        {video.comments.map((comment,i) => (
          <div key={i} className="mb-6 rounded p-3 bg-gray-900">
            <div className="text-lg font-semibold mb-2">{comment.user}</div>
            <div className="text-gray-300 text-sm">{comment.text}</div>
            <div className="text-gray- text-xs mt-2">
              {moment(comment.date).fromNow()}
            </div>
          </div>
        ))}
      </div></div>
      :
      <div>
        </div>}

    </div>
  );
}

export default CommentBox;