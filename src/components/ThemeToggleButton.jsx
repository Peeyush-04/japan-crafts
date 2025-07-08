import { useTheme } from '../context/ThemeContext';

const lightMode = "light", darkMode = "dark";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return(
    <button className='theme-toggle' onClick={ toggleTheme }>
      Switch to { theme === lightMode ? darkMode : lightMode } Mode
    </button>
  ); 
}