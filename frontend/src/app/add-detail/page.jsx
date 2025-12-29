// Updated Add Details component for Study Group Finder
'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const AddDetailSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short').max(40, 'Too Long').required('Provide group name..!'),
  description: Yup.string().min(10, 'Description too short').required('Provide description..!'),
  category: Yup.string().required('Select a category..!'),
  thumbnail: Yup.string().required('Provide thumbnail URL..!'),
});

const AddDetail = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const adddetailForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      owner: '',
      members: '',
      category: '',
      thumbnail: ''
    },

    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios
        .post('http://localhost:5000/group/add', values)
        .then((result) => {
          toast.success('Group Created Successfully! 🎉');
          resetForm();
          setThumbnailPreview(null);
          router.push('/browse-groups');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong. Please try again.');
        });
    },

    validationSchema: AddDetailSchema,
  });

  const upload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append('file', file)
    fd.append('upload_preset', 'MERN_6:30')
    fd.append('cloud_name', 'dyhnpblpk')

    setUploading(true);
    axios.post('https://api.cloudinary.com/v1_1/dyhnpblpk/image/upload', fd)
      .then((result) => {
        toast.success('Image uploaded successfully!');
        console.log(result.data);
        adddetailForm.setFieldValue('thumbnail', result.data.url);
        setUploading(false);
      }).catch((err) => {
        toast.error('Failed to upload image');
        console.log(err);
        setUploading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            Create Your Study Group
          </h1>
          <p className="text-gray-400 text-lg">
            Share your passion for learning and build an amazing community.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500 border-opacity-30 rounded-2xl shadow-2xl p-8 md:p-10">
          <form onSubmit={adddetailForm.handleSubmit}>
            <div className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  📚 Group Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter an engaging group name"
                  onChange={adddetailForm.handleChange}
                  onBlur={adddetailForm.handleBlur}
                  value={adddetailForm.values.name}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
                />
                {(adddetailForm.errors.name && adddetailForm.touched.name) && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    ⚠️ {adddetailForm.errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  ✍️ Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your study group, topics, goals, and what members can expect..."
                  onChange={adddetailForm.handleChange}
                  onBlur={adddetailForm.handleBlur}
                  value={adddetailForm.values.description}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all resize-none"
                />
                {(adddetailForm.errors.description && adddetailForm.touched.description) && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    ⚠️ {adddetailForm.errors.description}
                  </p>
                )}
              </div>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Members */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    👥 Expected Members
                  </label>
                  <input
                    type="number"
                    name="members"
                    placeholder="e.g., 25"
                    onChange={adddetailForm.handleChange}
                    onBlur={adddetailForm.handleBlur}
                    value={adddetailForm.values.members}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
                  />
                  {(adddetailForm.errors.members && adddetailForm.touched.members) && (
                    <p className="text-xs text-red-400 mt-2">
                      ⚠️ {adddetailForm.errors.members}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    📖 Category
                  </label>
                  <datalist id='categories'>
                    <option value="Programming">Programming</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Government Exams">Government Exams</option>
                    <option value="Medical">Medical</option>
                    <option value="Computer Application">Computer Application</option>
                    <option value="School Subjects">School Subjects</option>
                  </datalist>
                  <input
                    list='categories'
                    type='text'
                    name="category"
                    placeholder="Select or type a category"
                    value={adddetailForm.values.category}
                    onChange={adddetailForm.handleChange}
                    onBlur={adddetailForm.handleBlur}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
                    required
                  />
                  {(adddetailForm.errors.category && adddetailForm.touched.category) && (
                    <p className="text-xs text-red-400 mt-2">
                      ⚠️ {adddetailForm.errors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  🖼️ Group Thumbnail
                </label>

                {/* Preview */}
                {(thumbnailPreview || adddetailForm.values.thumbnail) && (
                  <div className="mb-4 rounded-lg overflow-hidden border-2 border-purple-500 border-opacity-50">
                    <img
                      src={thumbnailPreview || adddetailForm.values.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                <div className="relative">
                  <input
                    type="file"
                    onChange={upload}
                    disabled={uploading}
                    className="hidden"
                    id="thumbnail-input"
                    accept="image/*"
                  />
                  <label
                    htmlFor="thumbnail-input"
                    className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-purple-500 border-opacity-50 rounded-lg cursor-pointer transition-all ${uploading ? 'bg-slate-700 opacity-60' : 'hover:bg-slate-700 hover:border-opacity-100'
                      }`}
                  >
                    <div className="text-center">
                      {uploading ? (
                        <>
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mb-2"></div>
                          <p className="text-gray-300 font-medium">Uploading...</p>
                        </>
                      ) : (
                        <>
                          <p className="text-2xl mb-2">📤</p>
                          <p className="text-gray-300 font-medium">Click to upload thumbnail</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {(adddetailForm.errors.thumbnail && adddetailForm.touched.thumbnail) && (
                  <p className="text-xs text-red-400 mt-2">
                    ⚠️ {adddetailForm.errors.thumbnail}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                🚀 Create Study Group
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By creating a group, you agree to foster a positive and respectful learning environment.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDetail;
