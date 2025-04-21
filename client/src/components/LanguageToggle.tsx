import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../lib/store';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };
  
  return (
    <button 
      onClick={toggleLanguage} 
      className="p-2 text-white hover:text-[#C9AB81] focus:outline-none mr-2"
    >
      <span className="font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
};

export default LanguageToggle;
