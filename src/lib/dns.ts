import { DNSRecordData } from '../model/gcp/dns/record';
import { StringMap } from '../model/map';

import { dnsConfig } from './configuration';
import { createEntry } from './dns/entry';

/**
 * Create the DNS records.
 *
 * @returns {StringMap<DNSRecordData[]>} the DNS records
 */
export const createDNS = (): StringMap<DNSRecordData[]> =>
  Object.fromEntries(
    Object.entries(dnsConfig.zone).map(([zone, data]) => [
      zone,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data.entry).flatMap(([_, entry]) =>
        createEntry(zone, data.data, entry),
      ),
    ]),
  );
