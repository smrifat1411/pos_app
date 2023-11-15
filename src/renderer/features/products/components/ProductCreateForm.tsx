import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CategoryDropdown from './CategoryDropdown';

import { Checkbox, FormControlLabel } from '@mui/material';
import Button from 'renderer/components/Button';

interface Option {
  value: string;
  label: string;
}

interface Props {
  onSuccess: () => void;
}

const ProductCreateForm = ({ onSuccess }: Props) => {
  const handleCategoryChange = (option: Option | null) => {
    formik.setFieldValue('category', option ? option.value : '');
  };

  const handleDiscountableCheckbox = (e: any) => {
    formik.setFieldValue('discountable', e.target.checked);
    if (!e.target.checked) {
      formik.setFieldValue('discount', 0);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name is required'),
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
    discountable: Yup.boolean().required(
      'Please define is this product is discountable or not',
    ),
    discount: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      discountable: false,
      discount: 0,
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        price: values.price,
        category: values.category,
        discountable: values.discountable,
        discount: values.discountable ? values.discount : 0,
        isOnline: false,
      };

      formik.resetForm();
      onSuccess();
    },
  });

  return (
    <form
      className="h-full w-[480px] flex flex-col items-center relative px-4 pb-6 rounded-lg"
      onSubmit={formik.handleSubmit}
    >
      <div className="group relative z-0 mb-6 w-full">
        <input
          type="text"
          name="name"
          id="name"
          className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
            formik.errors.name && 'border-red-500'
          }`}
          placeholder=" "
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label
          htmlFor="name"
          className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
            formik.values.name && 'text-blue-600'
          }`}
        >
          Product Name
        </label>
        {formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 w-full md:gap-6">
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="number"
            name="price"
            id="price"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
              formik.errors.price && 'border-red-500'
            }`}
            placeholder=" "
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <label
            htmlFor="price"
            className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
              formik.values.price && 'text-blue-600'
            }`}
          >
            Price
          </label>
          {formik.errors.price && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
          )}
        </div>
        <div className="mb-6 w-full">
          <CategoryDropdown
            selectedCategory={formik.values.category}
            onCategoryChange={handleCategoryChange}
          />
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>
      </div>
      <div className="group relative z-0 mb-6 w-full">
        <FormControlLabel
          required
          control={<Checkbox />}
          label="is Discountable Product"
          onChange={(e) => handleDiscountableCheckbox(e)}
          value={formik.values.discountable}
        />
        {formik.errors.discountable && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.discountable}
          </p>
        )}
      </div>
      {formik.values.discountable && (
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="number"
            name="discount"
            id="discount"
            className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500 ${
              formik.errors.discount && 'border-red-500'
            }`}
            onChange={formik.handleChange}
            value={formik.values.discount}
          />
          <label
            htmlFor="discount"
            className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 ${
              formik.values.discount && 'text-blue-600'
            }`}
          >
            Percentage of Discount
          </label>
        </div>
      )}
      <Button onclick={formik.handleSubmit} txt="Create" />
    </form>
  );
};

export default ProductCreateForm;
