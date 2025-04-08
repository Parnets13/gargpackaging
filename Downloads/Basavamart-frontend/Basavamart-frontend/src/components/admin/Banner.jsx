import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [editBanner, setEditBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });

  // Fetch banners from the backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/banner/getBanners"
        );
        if (response.status === 200) {
          console.log("Banners fetched:", response.data);
          setBanners(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const handleAdd = () => {
    setEditBanner(null);
    setFormData({ title: "", image: null });
    setIsModalOpen(true);
  };

  const handleEdit = (banner) => {
    setEditBanner(banner);
    setFormData({ title: banner.title, image: null });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/banner/deleteBanner/${id}`);
      setBanners(banners.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editBanner) {
        const response = await axios.put(
          `http://localhost:3003/api/banner/editBanner/${editBanner._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setBanners(
          banners.map((banner) =>
            banner._id === editBanner._id ? response.data : banner
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:3003/api/banner/addBanner",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setBanners([...banners, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Banner
        </button>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners?.map((banner) => (
          <div
            key={banner?._id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={`http://localhost:3003${banner?.image}`}
              alt={banner?.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                console.error("Error loading image:", banner?.image);
                e.target.src = 'placeholder-image-url'; // Optional: Add a placeholder image
              }}
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{banner?.title}</h2>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner?._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editBanner ? "Edit Banner" : "Add New Banner"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editBanner ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
