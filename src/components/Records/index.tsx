import { RenderPageCtx } from 'datocms-plugin-sdk';
import { useContext, useEffect } from 'react';
import { Canvas } from 'datocms-react-ui';

import { Record } from '../../models/record';
import { RecordContext } from '../../contexts/RecordContext';
import styles from './styles.module.css';
import RecordService from '../../services/RecordService';
import BlankSlate from '../BlankSlate/BlankSlate';
import RecordItem from '../RecordItem/RecordItem';

type Props = {
  ctx: RenderPageCtx;
};

const Records = ({ ctx }: Props) => {
  const { records, setRecords, recordError, publishError } =
    useContext(RecordContext);

  const isRecordsEmpty = records.length === 0;

  const recordService = new RecordService(
    ctx.currentUserAccessToken!,
  );

  useEffect(() => {
    async function getStoredRecords() {
      try {
        const { records } = await recordService.getStoredRecords();

        setRecords(records);
      } catch (error) {
        return;
      }
    }

    getStoredRecords();
  }, []);

  return (
    <Canvas ctx={ctx}>
      {!isRecordsEmpty ? (
        <>
          <div className={styles.header}>
            <h3>Record Name</h3>
          </div>

          <div className={styles.tableContainer}>
            {records.map(({ title, id }: Record) => (
              <RecordItem key={id} title={title} />
            ))}
          </div>
        </>
      ) : (
        <BlankSlate
          description={
            recordError || publishError
              ? 'No records found or record may not be unpublished'
              : 'Please search for an unpublished record'
          }
        />
      )}
    </Canvas>
  );
};

export default Records;
