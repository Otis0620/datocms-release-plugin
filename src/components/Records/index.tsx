import { RenderPageCtx } from 'datocms-plugin-sdk';
import { useContext } from 'react';
import { Canvas } from 'datocms-react-ui';

import { Record } from '../../models/record';
import { RecordContext } from '../../contexts/RecordContext';
import styles from './styles.module.css';

type Props = {
  ctx: RenderPageCtx;
};

const Records = ({ ctx }: Props) => {
  const { records } = useContext(RecordContext);
  const isRecordsEmpty = records.length === 0;

  return (
    <Canvas ctx={ctx}>
      {!isRecordsEmpty ? (
        <>
          <div className={styles.header}>
            <h3>Record Name</h3>
          </div>
          <div className={styles.tableContainer}>
            {records.map((record: Record) => (
              <div key={record.id} className={styles.row}>
                <div className={styles.column}>{record.title}</div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </Canvas>
  );
};

export default Records;
