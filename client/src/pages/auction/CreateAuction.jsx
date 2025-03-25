import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { uploadToCloudinary } from '../../utils/uploadCloudinary.js';
import Categories from '../categories/categoryData.js';
import { useDispatch, useSelector } from 'react-redux';
import { createAuctionThunk } from '../../store/Thunks/AuctionThunk.jsx';
import {toast} from 'react-toastify'
const AuctionForm ={
  itemName: '',
  description: '',
  category: '',
  images: [],
  startPrice: '',
  startTime: '',
  endTime: ''
}
const CreateAuction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(AuctionForm);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = 'Item name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (files.length === 0) newErrors.images = 'At least one image is required';
    if (!formData.startPrice || formData.startPrice <= 0) newErrors.startPrice = 'Valid starting price is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (new Date(formData.endTime) <= new Date(formData.startTime)) newErrors.endTime = 'End time must be after start time';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    
    // Create preview URLs
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Upload images to Cloudinary
      const uploadedUrls = await Promise.all(
        files.map(async (file) => {
          const url = await uploadToCloudinary(file);
          if (!url) throw new Error('Image upload failed');
          return url;
        })
      );

      // Submit form with image URLs
      const response = await dispatch(createAuctionThunk({ ...formData, images: uploadedUrls ,userId:user.id}))
      if(response?.payload?.success){
        setFormData(AuctionForm)
        toast.success(response?.payload?.message)

      }
      // navigate(`/auctions/${response.data._id}`);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrors({ submit: err.message || 'Failed to create auction' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Name
          </label>
          <input
            type="text"
            value={formData.itemName}
            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
            className={`w-full p-2 border rounded-lg ${errors.itemName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full p-2 border rounded-lg h-32 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={`w-full p-2 border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a category</option>
            {Categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Auction Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className={`w-full p-2 border rounded-lg ${
              errors.images ? 'border-red-500' : 'border-gray-300'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            accept="image/*"
            disabled={isSubmitting}
          />
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
        </div>

        {/* Price and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.startPrice}
              onChange={(e) => setFormData({ ...formData, startPrice: e.target.value })}
              className={`w-full p-2 border rounded-lg ${errors.startPrice ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.startPrice && <p className="text-red-500 text-sm mt-1">{errors.startPrice}</p>}
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auction Start Time
            </label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className={`w-full p-2 border rounded-lg ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auction End Time
            </label>
            <input
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className={`w-full p-2 border rounded-lg ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Auction...' : 'Create Auction'}
        </button>
        
        {errors.submit && (
          <p className="text-red-500 text-center mt-4">{errors.submit}</p>
        )}
      </form>
    </div>
  );
};

export default CreateAuction;