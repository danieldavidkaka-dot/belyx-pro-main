import React from 'react';

interface AddOnProps {
  title: string;
  price: number;
  duration: number;
  image: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function AddOnRow({ title, price, duration, image, isSelected, onToggle }: AddOnProps) {
  return (
    <div 
      onClick={onToggle}
      className={`flex items-center p-3 mb-3 rounded-2xl cursor-pointer border transition-all ${
        isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-100 bg-white'
      }`}
    >
      <img src={image} alt={title} className="w-12 h-12 rounded-xl object-cover" />
      <div className="flex-1 ml-3">
        <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-500">+{duration} mins • Treatment</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-900">+${price}</span>
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
        }`}>
          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
        </div>
      </div>
    </div>
  );
}