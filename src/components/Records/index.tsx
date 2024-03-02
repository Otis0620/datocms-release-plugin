import { RenderPageCtx } from 'datocms-plugin-sdk';
import { useContext } from 'react';
import { Canvas } from 'datocms-react-ui';

import { Record } from '../../models/record';
import { RecordContext } from '../../contexts/RecordContext';

type Props = {
  ctx: RenderPageCtx;
};

const Records = ({ ctx }: Props) => {
  const { records } = useContext(RecordContext);

  return (
    <Canvas ctx={ctx}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: Record) => (
            <tr key={record.id}>
              <td>{record.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Canvas>
  );
};

export default Records;
