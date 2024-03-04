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
    const storedRecords = await this.getStoredRecords();
    const existingModel = await this.findExistingModel();
    const isModelEmpty = Object.keys(existingModel).length === 0;

    await this.destroyRecord(storedRecords.recordId);

    if (isModelEmpty) {
      const model = await this.createRecordModel();

      this.modelId = model.id;

      await this.createField();
    } else {
      this.modelId = existingModel.id;
    }

    await this.createRecord(records);

    return records;
  }

  async destroyRecord(recordId: string): Promise<void> {
    try {
      await this.client.items.destroy(recordId);
    } catch (error) {
      return;
    }
  }

  async findExistingModel(): Promise<SimpleSchemaTypes.ItemType> {
    try {
      const model = await this.client.itemTypes.find(this.apiKey);

      return model;
    } catch (error) {
      return {} as SimpleSchemaTypes.ItemType;
    }
  }

  async listRecords(query: string): Promise<Record[]> {
    try {
      const records = await this.client.items.list({
        filter: {
          query,
        },
        locale: 'en',
        order_by: '_rank_DESC',
      });

      return this.mapRecords(records);
    } catch (error) {
      return [] as Record[];
    }
  }

  async getStoredRecords(): Promise<{
    recordId: string;
    records: Record[];
  }> {
    try {
      const records = await this.client.items.list({
        filter: {
          type: this.apiKey,
        },
      });

      return {
        recordId: records[0].id,
        records: JSON.parse(records[0].record as string),
      };
    } catch (error) {
      return { recordId: '', records: [] };
    }
  }

  async createRecordModel(): Promise<SimpleSchemaTypes.ItemType> {
    try {
      const model = await this.client.itemTypes.create({
        name: this.modelName,
        api_key: this.apiKey,
        singleton: true,
      });

      return model;
    } catch (error) {
      return {} as SimpleSchemaTypes.ItemType;
    }
  }

  async createField(): Promise<void> {
    try {
      await this.client.fields.create(this.modelId, {
        api_key: this.apiKey,
        label: this.fieldLabel,
        field_type: 'json',
      });
    } catch (error) {
      return;
    }
  }

  async createRecord(records: Record[]) {
    try {
      await this.client.items.create({
        item_type: { type: 'item_type', id: this.modelId },
        record: JSON.stringify(records),
      });
    } catch (error) {
      return;
    }
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
