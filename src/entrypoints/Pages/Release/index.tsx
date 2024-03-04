import { RenderPageCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { useState } from 'react';

import { Record } from '../../../models/record';
import { RecordContext } from '../../../contexts/RecordContext';
import RecordsSearchBar from '../../../components/RecordsSearchBar';
import Records from '../../../components/Records';
import { Error } from '../../../errors';

type Props = {
  ctx: RenderPageCtx;
};

const Release = ({ ctx }: Props) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [recordError, setRecordError] =
    useState<Error.FETCH_RECORD_ERROR>(
      '' as Error.FETCH_RECORD_ERROR,
    );
  const [publishError, setPublishError] =
    useState<Error.BULK_PUBLISH_RECORD_ERROR>(
      '' as Error.BULK_PUBLISH_RECORD_ERROR,
    );

  return (
    <Canvas ctx={ctx}>
      <RecordContext.Provider
        value={{
          records,
          setRecords,
          recordError,
          setRecordError,
          publishError,
          setPublishError,
        }}
      >
        <RecordsSearchBar ctx={ctx} />
        <Records ctx={ctx} />
      </RecordContext.Provider>
    </Canvas>
  );
};

export default Release;
