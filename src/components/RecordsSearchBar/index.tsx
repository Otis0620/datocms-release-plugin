import { RenderPageCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextInput } from 'datocms-react-ui';
import { useContext, useState } from 'react';

import { RecordContext } from '../../contexts/RecordContext';
import styles from './styles.module.css';
import RecordService from '../../services/RecordService';

type Props = {
  ctx: RenderPageCtx;
};

const RecordsSearchBar = ({ ctx }: Props) => {
  const [recordName, setRecordName] = useState<string>('');
  const { records, setRecords } = useContext(RecordContext);

  const recordService = new RecordService(
    ctx.currentUserAccessToken!,
  );

  async function handleSearchRecords() {
    try {
      const records = await recordService.searchRecords(recordName);

      setRecords(records);
      setRecordName('');
    } catch (error) {
      setRecords([]);
      setRecordName('');
    }
  }

  function handleBulkPublish() {
    recordService.bulkPublish(records);

    setRecords([]);
    setRecordName('');
  }

  const handleOnChange = (recordName: string) => {
    setRecordName(recordName);
  };

  return (
    <Canvas ctx={ctx}>
      <div
        onSubmit={() => console.log('onSubmit')}
        className={styles.formContainer}
      >
        <div className={styles.searchInputContainer}>
          <TextInput
            required
            name="RecordName"
            id="RecordName"
            value={recordName}
            placeholder="Search for a record"
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
