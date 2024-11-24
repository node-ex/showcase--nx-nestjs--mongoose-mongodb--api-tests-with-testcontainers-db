// import type { StartedMongoDBContainer } from '@testcontainers/mongodb';
import type { StartedTestContainer } from 'testcontainers';
import type { Connection } from 'mongoose';

declare global {
  /**
   * Available in the global Node.js context
   */
  // eslint-disable-next-line no-var
  var __MONGO_TESTCONTAINER__: StartedTestContainer; // StartedMongoDBContainer;

  /**
   * Available in the isolated test context
   */
  // eslint-disable-next-line no-var
  var __MONGOOSE_CONNECTION__: Connection;
}

export {};
