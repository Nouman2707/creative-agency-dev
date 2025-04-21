import { useState } from 'react';
import { useNavigate } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../lib/store';
import { SearchIcon, CloseIcon } from '@/assets/icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [, navigate] = useNavigate();
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (query.trim().length >= 2) {
      dispatch(setSearchQuery(query));
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-[#36261E] p-6 rounded-lg shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-poppins font-semibold text-white">
            {t('nav.search')}
          </h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-[#C9AB81]"
          >
            <CloseIcon size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('nav.searchPlaceholder')}
              className="w-full bg-[#5D4037] border border-gray-700 rounded-md py-3 px-4 text-white focus:ring-[#C9AB81] focus:border-[#C9AB81]"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-3 text-white"
            >
              <SearchIcon size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
