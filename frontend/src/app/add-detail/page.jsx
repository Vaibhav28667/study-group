// Updated Add Details component for Study Group Finder
'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const AddDetailSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short').max(40, 'Too Long').required('Provide group name..!'),
  description: Yup.string().min(10, 'Description too short').required('Provide description..!'),
  // owner: Yup.string().required('Provide owner name..!'),
  // members: Yup.number().min(1, 'Minimum 1 member required').required('Provide members count..!'),
  category: Yup.string().required('Select a category..!'),
  thumbnail: Yup.string().required('Provide thumbnail URL..!'),
});

const AddDetail = () => {
  const router = useRouter();

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
          toast.success('Group Added Successfully..!');
          resetForm();
          router.push('/browse-groups');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something Failed..!');
        });
    },

    validationSchema: AddDetailSchema,
  });

  const upload = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file)
    fd.append('upload_preset', 'MERN_6:30')
    fd.append('cloud_name', 'dyhnpblpk')

    axios.post('https://api.cloudinary.com/v1_1/dyhnpblpk/image/upload', fd)
      .then((result) => {
        toast.success('Joined Group successfully');
        console.log(result.data);
        adddetailForm.setFieldValue('thumbnail', result.data.url);

      }).catch((err) => {
        toast.error('Error in  joining');
        console.log(err);

      });
  }

  return (
    <div className="mt-7 mx-auto w-1/3 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-gray-500 dark:border-neutral-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Add Study Group</h1>
        </div>

        <div className="mt-5">
          <form onSubmit={adddetailForm.handleSubmit}>
            <div className="grid gap-y-4">

              {/* Name */}
              <div>
                <label className="block text-sm mb-2 dark:text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={adddetailForm.handleChange}
                  value={adddetailForm.values.name}
                  className="py-2.5 px-4 w-full border-gray-200 rounded-lg sm:text-sm dark:bg-neutral-900 dark:text-neutral-300"
                />
                {(adddetailForm.errors.name && adddetailForm.touched.name) && (
                  <p className="text-xs text-red-600 mt-2">{adddetailForm.errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2 dark:text-white">Description</label>
                <textarea
                  name="description"
                  onChange={adddetailForm.handleChange}
                  value={adddetailForm.values.description}
                  className="py-2.5 px-4 w-full border-gray-200 rounded-lg sm:text-sm dark:bg-neutral-900 dark:text-neutral-300"
                />
                {(adddetailForm.errors.description && adddetailForm.touched.description) && (
                  <p className="text-xs text-red-600 mt-2">{adddetailForm.errors.description}</p>
                )}
              </div>

              {/* Members */}
              <div>
                <label className="block text-sm mb-2 dark:text-white">Members</label>
                <input
                  type="number"
                  name="members"
                  onChange={adddetailForm.handleChange}
                  value={adddetailForm.values.members}
                  className="py-2.5 px-4 w-full border-gray-200 rounded-lg sm:text-sm dark:bg-neutral-900 dark:text-neutral-300"
                />
                {(adddetailForm.errors.members && adddetailForm.touched.members) && (
                  <p className="text-xs text-red-600 mt-2">{adddetailForm.errors.members}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm mb-2 dark:text-white">Category</label>

                <datalist id='categories'>
                  <option value="Programming">Programming</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Government Exams">Government Exams</option>
                  <option value="Medical">Medical</option>
                  <option value="Computer Application">Computer Application</option>
                  <option value="School Subjects">School Subjects</option>
                </datalist>
                <input list='categories' className="py-2.5 px-4 w-full border-gray-200 rounded-lg sm:text-sm dark:bg-neutral-900 dark:text-neutral-300"
                  type='text'
                  name="category"
                  value={adddetailForm.values.category}
                  onChange={adddetailForm.handleChange}
                  required
                />
              </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm mb-2 dark:text-white">Thumbnail URL</label>
              <input
                type="file"
                placeholder="Thumbnail Image URL"
                onChange={upload}
                className="py-2.5 px-4 w-full border-gray-200 rounded-lg sm:text-sm dark:bg-neutral-900 dark:text-neutral-300"
              />
              {(adddetailForm.errors.thumbnail && adddetailForm.touched.thumbnail) && (
                <p className="text-xs text-red-600 mt-2">{adddetailForm.errors.thumbnail}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              CREATE GROUP
            </button>
        </div>
      </form>
    </div>
      </div >
    </div >
  );
};

export default AddDetail;
