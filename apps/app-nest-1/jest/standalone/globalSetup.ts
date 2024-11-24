import type { Config } from '@jest/types';
import { debug as _debug } from 'debug';
import { GenericContainer, Wait } from 'testcontainers';
import mongoose from 'mongoose';

const debug = _debug('jest-mongodb:setup:custom');

export default async (
  globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig,
): Promise<void> => {
  // For outputting next debug message on a new line
  debug('');
  debug('standalone setup.ts');

  /**
   * MongoDBContainer from @testcontainers/mongodb did not work for me,
   * because of enabling replica set:
   * https://github.com/testcontainers/testcontainers-node/blob/main/packages/modules/mongodb/src/mongodb-container.ts#L9
   */
  const container = new GenericContainer('mongo:7.0.12-jammy')
    .withExposedPorts(27017)
    .withWaitStrategy(Wait.forLogMessage(/.*waiting for connections.*/i))
    .withStartupTimeout(120_000);
  const startedContainer = await container.start();
  debug('testcontainer started');

  globalThis.__MONGO_TESTCONTAINER__ = startedContainer;

  const host = startedContainer.getHost();
  const hostPort = startedContainer.getMappedPort(27017);
  const connectionUrl = `mongodb://${host}:${String(hostPort)}`;
  debug('connectionUrl', connectionUrl);
  try {
    const connection = await mongoose.connect(connectionUrl);
    debug('connection successful');
    await connection.disconnect();
  } catch (e) {
    debug('connection error', e);
    throw e;
  }
};
