import {
  Client,
  SimpleSchemaTypes,
  buildClient,
} from '@datocms/cma-client-browser';

import { Record } from '../models/record';

class RecordService {
  private client: Client;
  private apiKey: string = 'record';
  private modelName: string = 'Record';
  private fieldLabel: string = 'Records';
  private modelId: string = '';

  constructor(private accessToken: string) {
    this.client = buildClient({
      apiToken: this.accessToken,
    });
  }

  async searchRecords(query: string): Promise<Record[]> {
    const records = await this.listRecords(query);

    const model = await this.createRecordModel();

    this.modelId = model.id;

    await this.createField();

    await this.createRecord(records);

    return records;
  }

  async listRecords(query: string): Promise<Record[]> {
    const records = await this.client.items.list({
      filter: {
        query,
      },
      locale: 'en',
      order_by: '_rank_DESC',
    });

    return this.mapRecords(records);
  }

  async createRecordModel(): Promise<SimpleSchemaTypes.ItemType> {
    const model = await this.client.itemTypes.create({
      name: this.modelName,
      api_key: this.apiKey,
      singleton: true,
    });

    return model;
  }

  async createField(): Promise<void> {
    await this.client.fields.create(this.modelId, {
      api_key: this.apiKey,
      label: this.fieldLabel,
      field_type: 'json',
    });
  }

  async createRecord(records: Record[]) {
    await this.client.items.create({
      item_type: { type: 'item_type', id: this.modelId },
      record: JSON.stringify(records),
    });
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
