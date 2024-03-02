import {
  SimpleSchemaTypes,
  buildClient,
} from '@datocms/cma-client-browser';

import { Record } from '../models/record';

class RecordService {
  async searchRecords(
    query: string,
    accessToken: string,
  ): Promise<Record[]> {
    const client = buildClient({
      apiToken: accessToken,
    });

    const records = await client.items.list({
      filter: {
        query,
      },
      locale: 'en',
      order_by: '_rank_DESC',
    });

    return this.mapRecords(records);
  }

  mapRecords(
    records: SimpleSchemaTypes.ItemInstancesTargetSchema,
  ): Record[] {
    return records.map((record) => {
      return {
        id: record.id,
        title: record.title,
      };
    }) as Record[];
  }
}

export default RecordService;
