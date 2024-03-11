import { useContext, useState } from 'react';
import { RenderPageCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextInput } from 'datocms-react-ui';

import { Error } from '../../errors';
import { RecordContext } from '../../contexts/RecordContext';
import styles from './styles.module.css';
import RecordService from '../../services/RecordService';

type Props = {
  ctx: RenderPageCtx;
};

const RecordsSearchBar = ({ ctx }: Props) => {
  const [recordName, setRecordName] = useState<string>('');

  const { records, setRecords, setRecordError } =
    useContext(RecordContext);

  const recordService = new RecordService(
    ctx.currentUserAccessToken!,
  );

  async function handleSearchRecords() {
    const records = await recordService.searchRecords(recordName);

    const isRecords = records.length !== 0;

    if (isRecords) {
      setRecords(records);
      setRecordName('');
    } else {
      setRecordError(Error.FETCH_RECORD_ERROR);
      setRecords([]);
      setRecordName('');
    }
  }

  async function handleBulkPublish() {
    await recordService.bulkPublish(records);

    setRecords([]);
    setRecordName('');
  }

  const handleOnChange = (recordName: string) => {
    setRecordName(recordName);
  };

  return (
    <Canvas ctx={ctx}>
      <div className={styles.formContainer}>
        <div className={styles.searchInputContainer}>
          <TextInput
            required
            name="RecordName"
            id="RecordName"
            value={recordName}
            placeholder="Search for an unpublished record"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <Button
            buttonType="muted"
            onClick={handleSearchRecords}
            disabled={!recordName.length}
          >
            Search
          </Button>
        </div>

        <div className={styles.publishButtonContainer}>
          <Button
            buttonType="primary"
            onClick={handleBulkPublish}
            disabled={records.length === 0}
          >
            Publish
          </Button>
        </div>
      </div>
    </Canvas>
  );
};

export default RecordsSearchBar;
