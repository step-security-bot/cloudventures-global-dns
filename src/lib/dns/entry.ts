import * as gcp from '@pulumi/gcp';

import { EntryData, ZoneData } from '../../model/config/dns';
import { DNSRecordData } from '../../model/gcp/dns/record';
import { createRecord } from '../gcp/dns/record';

/**
 * Create the DNS entry.
 *
 * @param {string} zone the zone
 * @param {ZoneData} zoneData the zone data
 * @param {EntryData} entry the entry data
 * @returns {DNSRecordData[]} the DNS records
 */
export const createEntry = (
  zone: string,
  zoneData: ZoneData,
  entry: EntryData,
): DNSRecordData[] =>
  entry.domains.map((domain) => {
    const domainName =
      domain.length > 0
        ? `${domain}.${zoneData.baseDomain}`
        : zoneData.baseDomain;

    return createRecord(
      `${zone}-${entry.type}-${domainName}`,
      `${domainName}`,
      zone,
      zoneData.project ?? gcp.config.project ?? '',
      entry.type,
      entry.values.map((value) => splitByLength(value, entry.type)),
      {
        ttl: entry.ttl,
      },
    );
  });

/**
 * Splits the value by the allowed maximum length.
 *
 * @param {string} value the value
 * @param {string} type the entry type
 * @returns
 */
const splitByLength = (value: string, type: string) => {
  const split = value.split(/(.{200})/).filter((x) => x.length > 0);

  return split.length > 1 || type == 'TXT'
    ? `"${split.join('" "')}"`
    : split.join();
};
