import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie as IMovie } from "../type";
import { Calendar } from "lucide-react";

interface IComment {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
}

const defaultPoster =
  "https://www.plex.tv/wp-content/uploads/2025/03/Watch-Free-Hero-2048x1152-1.png";

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:3000/movie/movies/${id}`);
        if (!res.ok) throw new Error("Movie not found");
        const data: IMovie = await res.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/movie/movies/${id}/comments`,
        );
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !author.trim()) return;

    try {
      setCommentLoading(true);
      const res = await fetch(`http://localhost:3000/movies/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, text: newComment }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      const createdComment = await res.json();
      setComments((prev) => [createdComment, ...prev]);
      setNewComment("");
      setAuthor("");
    } catch (err) {
      console.error(err);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error || !movie) return <h1>{error || "Movie not found"}</h1>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={movie.poster || defaultPoster}
        alt={movie.title}
        className="w-full rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-2">{movie.plot}</p>
      <span className="flex gap-2 items-center text-gray-400 mb-8">
        <Calendar className="size-4" />
        {movie.year}
      </span>

      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <form onSubmit={handleAddComment} className="mb-6 space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded-md p-2"
          />
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded-md p-2"
            rows={3}
          />
          <button
            type="submit"
            disabled={commentLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {commentLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>

        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-400">No comments yet.</p>
          )}
          {comments.map((comment) => (
            <div key={comment._id} className="border rounded-md p-3 bg-gray-50">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p className="mt-2">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
