import { createContext } from 'react';

import { Record } from '../models/record';

type RecordContextType = {
  records: Record[];
  setRecords: (records: Record[]) => void;
};

export const RecordContext = createContext<RecordContextType>(
  {} as RecordContextType,
);
