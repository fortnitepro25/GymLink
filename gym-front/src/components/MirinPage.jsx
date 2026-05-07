import { useState } from "react";

export default function MirinPage({ setPage }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Zyzz",
      caption: "Mirin' these gains?",
      image:
        "/zyzz1.png",
      likes: 420,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: "ZyzzLegacy",
      caption: "Aesthetic is everything",
      image:
        "/zyzz2.png",
      likes: 289,
      timestamp: "Yesterday",
    },
    {
      id: 3,
      user: "ShreddedAngel",
      caption: "Just hit a new PR, feeling unstoppable",
      image: "/zyzz3.png",
      likes: 156,
      timestamp: "3 days ago",
    },
  ]);

  const [newCaption, setNewCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (!newCaption || !previewUrl) {
      alert("Please add a caption and select an image");
      return;
    }

    const newPost = {
      id: Date.now(),
      user: "You",
      caption: newCaption,
      image: previewUrl,
      likes: 0,
      timestamp: "Just now",
    };

    setPosts([newPost, ...posts]);
    setNewCaption("");
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#eee",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>Mirin' Page</h1>
        <button
          onClick={() => setPage("landing")}
          style={{
            padding: "12px 24px",
            background: "none",
            border: "1px solid #666",
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Post Creator */}
      <div
        style={{
          backgroundColor: "#1f1f1f",
          padding: "25px",
          borderRadius: "16px",
          marginBottom: "40px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Post Your Progress</h2>

        <input
          type="text"
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          placeholder="Write something aesthetic..."
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "1.1rem",
            background: "#2a2a2a",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            marginBottom: "15px",
          }}
        />

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ color: "#ccc" }}
          />
          <button
            onClick={handlePost}
            style={{
              padding: "12px 30px",
              background: "#4b6ae7",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Post to Mirin'
          </button>
        </div>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            style={{
              maxWidth: "300px",
              marginTop: "15px",
              borderRadius: "12px",
            }}
          />
        )}
      </div>

      {/* Posts Feed */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "25px",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#1f1f1f",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <img
              src={post.image}
              alt={post.caption}
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />

            <div style={{ padding: "18px" }}>
              <strong style={{ color: "#4d8bff" }}>{post.user}</strong>
              <p style={{ margin: "10px 0" }}>{post.caption}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <span>❤️ {post.likes}</span>
                <small style={{ color: "#888" }}>{post.timestamp}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
        Keep Mirin' • Stay Aesthetic
      </div>
    </div>
  );
}
