import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from '@jest/environment';
import { TestEnvironment as NodeEnvironment } from 'jest-environment-node';
import { debug as _debug } from 'debug';
import { createHash } from 'crypto';

const debug = _debug('jest-mongodb:environment:custom');

export default class TestEnvironment extends NodeEnvironment {
  testFilePath: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
    debug('standalone TestEnvironment.constructor');

    this.testFilePath = context.testPath;

    debug('this.testFilePath', this.testFilePath);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  override async setup() {
    await super.setup();

    debug('standalone TestEnvironment.setup');

    /**
     * Requirements for the DB name:
     * - Can contain only ASCII characters
     * - Cannot contain any of the following characters: /\. "$*<>:|?
     * - Cannot contain a null character
     * - Must be at least 1 character long and no more than 64 bytes long
     *
     * MD5 hash in a hexadecimal format is 32 characters long and contains only
     * ASCII letters and numbers, so it should be a valid DB name.
     *
     * Sources
     * - https://www.mongodb.com/docs/manual/reference/limits/#naming-restrictions
     */
    const dbName = createHash('md5').update(this.testFilePath).digest('hex');
    const mongoHost = globalThis.__MONGO_TESTCONTAINER__.getHost();
    const mongoPort = globalThis.__MONGO_TESTCONTAINER__.getMappedPort(27017);
    const mongoUriWithDbName = `mongodb://${mongoHost}:${String(
      mongoPort,
    )}/${dbName}`;
    /**
     * When MONGODB_URL is set via process.env here, tests do not see this
     * change because they are run inside the `this.global` vm context that is
     * isolated from the global Node.js context. Only environment variables
     * present in the global Node.js context (process.env) at the time of
     * isolated context creation are available to the tests.
     *
     * But setting it via this.global.process.env works.
     */
    this.global.process.env['MONGODB_URL'] = mongoUriWithDbName;

    debug('process.env[MONGODB_URL]', process.env['MONGODB_URL']);
    debug(
      'this.global.process.env[MONGODB_URL]',
      this.global.process.env['MONGODB_URL'],
    );
  }

  override async teardown() {
    debug('standalone TestEnvironment.teardown - before super');
    await super.teardown();
    debug('standalone TestEnvironment.teardown - after super');
  }

  override getVmContext() {
    /* A lot of calls... */
    // debug('standalone TestEnvironment.getVmContext');
    return super.getVmContext();
  }
}
