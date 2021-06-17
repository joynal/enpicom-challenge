import { Knex } from 'knex';

const tableName = 'dna_records';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments().primary();
    table.text('sequence');
    table.timestamps(true, true);

    // create index for sequence, so that search can be first
    table.index('sequence', `${tableName}_sequence_index`);
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  await knex.schema.dropTable(tableName);
}
