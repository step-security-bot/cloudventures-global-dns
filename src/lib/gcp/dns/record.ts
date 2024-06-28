import * as gcp from '@pulumi/gcp';
import { CustomResourceOptions, Output } from '@pulumi/pulumi';

import { DNSRecordData } from '../../../model/gcp/dns/record';

export const defaultTtl = 300;

/**
 * Create a record.
 *
 * @param {string} name the record's name
 * @param {string} domain the record's domain
 * @param {string | Output<string>} zoneId the zone's ID
 * @param {string} project the GCP project fot his zone
 * @param {string} type the record's type
 * @param {readonly string[] | readonly Output<string>[]} records the records to apply
 * @param {number} ttl the TTL to set
 * @param {CustomResourceOptions} pulumiOptions pulumi options (optional)
 * @returns {DNSRecordData} the record data
 */
export const createRecord = (
  name: string,
  domain: string,
  zoneId: string | Output<string>,
  project: string,
  type: string,
  records: readonly string[] | readonly Output<string>[],
  {
    ttl = defaultTtl,
    pulumiOptions,
  }: {
    readonly ttl?: number;
    readonly project?: string;
    readonly pulumiOptions?: CustomResourceOptions;
  },
): DNSRecordData => {
  const record = new gcp.dns.RecordSet(
    'gcp-dns-record-' + name.replace(/\\W+/gi, '-'),
    {
      managedZone: zoneId,
      name: domain + '.',
      type: type,
      rrdatas: records.map((val) => val),
      ttl: ttl,
      project: project,
    },
    pulumiOptions,
  );

  return {
    resource: record,
    name: domain,
    fqdn: record.name,
  };
};
