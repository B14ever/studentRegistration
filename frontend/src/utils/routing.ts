
import { useNavigate } from 'react-router-dom';

export const useRouting = () => {
  const navigate = useNavigate();

  const goTo = (path : string, state = {}) => {
    navigate(path, { state });
  };

  return { goTo };
};
