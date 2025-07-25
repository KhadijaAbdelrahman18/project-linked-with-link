import React from 'react';

const EditModal = ({ type, data, onChange, onClose, onSubmit }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-8 rounded-xl max-w-lg w-full">
      <h2 className="text-xl font-bold mb-4">Edit {type === 'product' ? 'Product' : 'Service'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" value={data.name || ''} onChange={onChange} className="w-full border p-2 rounded" required />
        <input name="category" value={data.category || ''} onChange={onChange} className="w-full border p-2 rounded" required />
        <input name="price" value={data.price || ''} onChange={onChange} className="w-full border p-2 rounded" required />
        {type === 'product' && (
          <input name="stock" value={data.stock || ''} onChange={onChange} className="w-full border p-2 rounded" required />
        )}
        <textarea name="description" value={data.description || ''} onChange={onChange} className="w-full border p-2 rounded" required />
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
);

export default EditModal;