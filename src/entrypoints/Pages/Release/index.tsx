import { RenderPageCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { useState } from 'react';

import { Record } from '../../../models/record';
import { RecordContext } from '../../../contexts/RecordContext';
import RecordsSearchBar from '../../../components/RecordsSearchBar';
import Records from '../../../components/Records';

type Props = {
  ctx: RenderPageCtx;
};

const Release = ({ ctx }: Props) => {
  const [records, setRecords] = useState<Record[]>([]);

  return (
    <Canvas ctx={ctx}>
      <RecordContext.Provider value={{ records, setRecords }}>
        <RecordsSearchBar ctx={ctx} />
        <Records ctx={ctx} />
      </RecordContext.Provider>
    </Canvas>
  );
};

export default Release;
