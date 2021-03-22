import { useState, useCallback, useEffect } from 'react';

const useControllList = (getData) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const _getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getData();
      setList(data.results || data);
    } catch {}

    setLoading(false);
  }, [getData]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    try {
      const { data } = await getData();
      setList(data.results || data);
    } catch {}

    setRefresh(false);
  }, [getData]);

  return [list, loading, refresh, onRefresh, _getData];
};

export default useControllList;
