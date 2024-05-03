import { useMutation, useQueries } from '@tanstack/react-query';
import { QueryObject } from '../../services/QueryObject';

export const getLeadById = (isOnline, query) => {
    const mutate = useMutation({
      networkMode: 'always',
      mutationFn: (body) => {
        const leadList = QueryObject(query);
        return leadList;
      },
    });
    return mutate;
  };