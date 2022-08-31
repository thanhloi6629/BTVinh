import { useLocation , BrowserRouter  } from 'react-router-dom';

function useQuery() {
  console.log("useLocation", useLocation().search);
  return new URLSearchParams(useLocation().search);
}

export default useQuery;
