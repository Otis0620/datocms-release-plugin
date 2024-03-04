import { createContext } from 'react';

import { Error } from '../errors';
import { Record } from '../models/record';

type RecordContextType = {
  records: Record[];
  setRecords: (records: Record[]) => void;
  recordError: Error.FETCH_RECORD_ERROR;
  setRecordError: (error: Error.FETCH_RECORD_ERROR) => void;
  publishError: Error.BULK_PUBLISH_RECORD_ERROR;
  setPublishError: (error: Error.BULK_PUBLISH_RECORD_ERROR) => void;
};

export const RecordContext = createContext<RecordContextType>(
  {} as RecordContextType,
);
