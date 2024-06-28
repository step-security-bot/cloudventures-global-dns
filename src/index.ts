import { createDNS } from './lib/dns';

export = () => {
  const records = createDNS();

  return Object.fromEntries(
    Object.entries(records).map(([name, records]) => [
      name,
      records.map((record) => ({
        fqn: record.fqdn,
        type: record.resource.type,
      })),
    ]),
  );
};
